#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

async function getConfig() {
  const configPath = path.join(process.cwd(), 'neu.config.json');
  if (!(await fs.pathExists(configPath))) {
    console.log(chalk.red('❌ Config not found. Run: npx neu init'));
    process.exit(1);
  }
  return fs.readJson(configPath);
}

program
  .name('neu add')
  .description('Add a component to your project')
  .argument('<component>', 'Component name (e.g., button, card)')
  .action(async (componentName: string) => {
    const spinner = ora(`Adding ${chalk.cyan(componentName)}...`).start();

    try {
      const config = await getConfig();
      const sourcePath = path.join(process.cwd(), 'src/components/ui', componentName);
      const targetPath = path.join(process.cwd(), config.componentsPath, 'ui', componentName);

      if (!(await fs.pathExists(sourcePath))) {
        spinner.fail(chalk.red(`Component "${componentName}" not found`));
        console.log(chalk.dim('\\nAvailable components: button, card'));
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
  });

program.parse();
