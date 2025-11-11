import chalk from 'chalk';
import prompts from 'prompts';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

const utilsTemplate = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

const cssTemplate = `@import "tailwindcss";

/* Neumorphic Shadows */
.shadow-neu {
  box-shadow: 8px 8px 16px hsl(220 30% 85%), -8px -8px 16px hsl(0 0% 100%);
}
.shadow-neu-inset {
  box-shadow: inset 8px 8px 16px hsl(220 30% 85%), inset -8px -8px 16px hsl(0 0% 100%);
}
.shadow-neu-pressed {
  box-shadow: inset 4px 4px 8px hsl(220 30% 85%), inset -4px -4px 8px hsl(0 0% 100%);
}

.dark .shadow-neu {
  box-shadow: 8px 8px 16px hsl(220 30% 10%), -8px -8px 16px hsl(220 30% 20%);
}
.dark .shadow-neu-inset {
  box-shadow: inset 8px 8px 16px hsl(220 30% 10%), inset -8px -8px 16px hsl(220 30% 20%);
}
.dark .shadow-neu-pressed {
  box-shadow: inset 4px 4px 8px hsl(220 30% 10%), inset -4px -4px 8px hsl(220 30% 20%);
}
`;

export async function init() {
  console.log(chalk.bold.cyan('\n🎨 React Neumorphic Setup\n'));

  const response = await prompts([
    {
      type: 'text',
      name: 'componentsPath',
      message: 'Where would you like to install components?',
      initial: './src/components',
    },
    {
      type: 'text',
      name: 'utilsPath',
      message: 'Where would you like to install utils?',
      initial: './src/lib',
    },
    {
      type: 'text',
      name: 'cssPath',
      message: 'Where is your global CSS file?',
      initial: './src/index.css',
    },
  ]);

  if (!response.componentsPath) {
    console.log(chalk.red('Setup cancelled'));
    process.exit(0);
  }

  const spinner = ora('Setting up...').start();

  try {
    // Create directories
    await fs.ensureDir(path.join(process.cwd(), response.componentsPath, 'ui'));
    await fs.ensureDir(path.join(process.cwd(), response.utilsPath));

    // Create utils file
    const utilsFile = path.join(process.cwd(), response.utilsPath, 'utils.ts');
    if (!(await fs.pathExists(utilsFile))) {
      await fs.writeFile(utilsFile, utilsTemplate);
    }

    // Update or create CSS file
    const cssFile = path.join(process.cwd(), response.cssPath);
    if (await fs.pathExists(cssFile)) {
      const existingCss = await fs.readFile(cssFile, 'utf-8');
      if (!existingCss.includes('shadow-neu')) {
        await fs.appendFile(cssFile, '\n' + cssTemplate);
      }
    } else {
      await fs.writeFile(cssFile, cssTemplate);
    }

    // Create config file
    const config = {
      componentsPath: response.componentsPath,
      utilsPath: response.utilsPath,
      cssPath: response.cssPath,
    };
    await fs.writeFile(
      path.join(process.cwd(), 'neu.config.json'),
      JSON.stringify(config, null, 2)
    );

    spinner.succeed(chalk.green('Setup complete!'));
    
    // Auto-install dependencies
    console.log(chalk.dim('\nInstalling dependencies...'));
    const { execSync } = await import('child_process');
    
    try {
      execSync('npm install clsx tailwind-merge', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log(chalk.green('✓ Dependencies installed!'));
    } catch (error) {
      console.log(chalk.yellow('⚠ Failed to auto-install dependencies'));
      console.log(chalk.dim('Please run: npm install clsx tailwind-merge'));
    }
    
    console.log(chalk.dim('\nNext steps:'));
    console.log(chalk.dim('  Add components: npx react-neu add button'));
  } catch (error) {
    spinner.fail(chalk.red('Setup failed'));
    console.error(error);
    process.exit(1);
  }
}

init();
