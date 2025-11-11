#!/usr/bin/env node

// Check which command to run
const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
  import('./init.js');
} else if (command === 'add') {
  import('./add.js');
} else {
  console.log('Usage:');
  console.log('  npx react-neu init');
  console.log('  npx react-neu add <component>');
  process.exit(1);
}
