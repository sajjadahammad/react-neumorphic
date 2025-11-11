#!/usr/bin/env node
import { program } from 'commander';

program
  .name('react-neu')
  .description('React Neumorphic CLI')
  .version('1.0.7');

program
  .command('init')
  .description('Initialize react-neumorphic in your project')
  .action(async () => {
    await import('./init.js');
  });

program
  .command('add <component>')
  .description('Add a component to your project')
  .action(async (component: string) => {
    process.argv = ['node', 'react-neu', component];
    await import('./add.js');
  });

program.parse();
