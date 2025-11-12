import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import https from 'https';

async function getConfig() {
  const configPath = path.join(process.cwd(), 'neu.config.json');
  if (!(await fs.pathExists(configPath))) {
    console.log(chalk.red('❌ Config not found. Run: npx react-neu init'));
    process.exit(1);
  }
  return fs.readJson(configPath);
}

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/sajjadahammed08/react-neumorphic/main/src/components/ui';

const COMPONENTS_REGISTRY: Record<string, { file: string; name: string }> = {
  button: { file: 'NeuButton.tsx', name: 'NeuButton' },
  card: { file: 'NeuCard.tsx', name: 'NeuCard' },
  badge: { file: 'Badge.tsx', name: 'Badge' },
};

async function fetchFile(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch: ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

export async function add(componentName: string) {
  const spinner = ora(`Adding ${chalk.cyan(componentName)}...`).start();

  try {
    const config = await getConfig();
    
    // Check if component exists in registry
    if (!COMPONENTS_REGISTRY[componentName]) {
      spinner.fail(chalk.red(`Component "${componentName}" not found`));
      console.log(chalk.dim('\nAvailable components:'));
      Object.keys(COMPONENTS_REGISTRY).forEach(comp => {
        console.log(chalk.dim(`  - ${comp}`));
      });
      process.exit(1);
    }

    const component = COMPONENTS_REGISTRY[componentName];
    const targetDir = path.join(process.cwd(), config.componentsPath, 'ui', componentName);
    const targetFile = path.join(targetDir, component.file);

    // Create target directory
    await fs.ensureDir(targetDir);

    // Fetch component from GitHub
    spinner.text = `Downloading ${componentName}...`;
    const url = `${GITHUB_RAW_BASE}/${componentName}/${component.file}`;
    
    try {
      const content = await fetchFile(url);
      await fs.writeFile(targetFile, content);
    } catch (error) {
      // Fallback: try to find in local package installation
      const { fileURLToPath } = await import('url');
      const { dirname } = await import('path');
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const packageRoot = path.resolve(__dirname, '../../');
      const localPath = path.join(packageRoot, 'src/components/ui', componentName, component.file);
      
      if (await fs.pathExists(localPath)) {
        await fs.copy(localPath, targetFile);
      } else {
        throw new Error('Component not found in remote or local sources');
      }
    }

    spinner.succeed(chalk.green(`${componentName} added successfully!`));
    console.log(chalk.dim(`→ ${config.componentsPath}/ui/${componentName}/${component.file}`));
    console.log(chalk.dim(`\nImport with:`));
    console.log(chalk.cyan(`  import { ${component.name} } from '@/components/ui/${componentName}/${component.file.replace('.tsx', '')}';`));
  } catch (error) {
    spinner.fail(chalk.red('Failed to add component'));
    console.error(error);
    process.exit(1);
  }
}

const componentName = process.argv[2];
if (componentName) {
  add(componentName);
}
