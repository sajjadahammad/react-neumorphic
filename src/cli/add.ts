import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getConfig() {
  const configPath = path.join(process.cwd(), 'neu.config.json');
  if (!(await fs.pathExists(configPath))) {
    console.log(chalk.red('❌ Config not found. Run: npx react-neu init'));
    process.exit(1);
  }
  return fs.readJson(configPath);
}

const COMPONENTS_REGISTRY: Record<string, string[]> = {
  button: ['NeuButton.tsx', 'index.ts'],
  card: ['NeuCard.tsx', 'index.ts'],
  badge: ['Badge.tsx', 'index.ts'],
};

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

    // Try to find the component in the package
    const packageRoot = path.resolve(__dirname, '../../');
    const sourcePath = path.join(packageRoot, 'src/components/ui', componentName);
    const targetPath = path.join(process.cwd(), config.componentsPath, 'ui', componentName);

    if (!(await fs.pathExists(sourcePath))) {
      spinner.fail(chalk.red(`Component source not found in package`));
      console.log(chalk.yellow('\nNote: Components should be copied from the package installation.'));
      process.exit(1);
    }

    await fs.copy(sourcePath, targetPath);

    spinner.succeed(chalk.green(`${componentName} added successfully!`));
    console.log(chalk.dim(`→ ${config.componentsPath}/ui/${componentName}`));
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
