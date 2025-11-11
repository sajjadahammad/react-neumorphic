#!/usr/bin/env node

const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
  import('./init.js');
} else if (command === 'add') {
  const componentName = args[1];
  if (!componentName) {
    console.error('Error: Please specify a component name');
    console.log('Usage: npx react-neu add <component>');
    process.exit(1);
  }
  process.argv = ['node', 'react-neu', componentName];
  import('./add.js');
} else {
  console.log('React Neumorphic CLI\n');
  console.log('Usage:');
  console.log('  npx react-neu init              Initialize in your project');
  console.log('  npx react-neu add <component>   Add a component\n');
  console.log('Examples:');
  console.log('  npx react-neu init');
  console.log('  npx react-neu add button');
  console.log('  npx react-neu add card');
}
