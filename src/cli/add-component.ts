#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

const componentTemplate = (name: string) => `import * as React from 'react';
import { cn } from '../../../lib/utils';

interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {}

export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 rounded-xl shadow-neu bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900', className)}
        {...props}
      />
    );
  }
);
${name}.displayName = '${name}';
`;

const storyTemplate = (name: string) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'UI/${name}',
  component: ${name},
};
export default meta;

type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {
    children: '${name} Component',
  },
};
`;

program
  .name('react-neumorphic')
  .description('Add a new component (shadcn-style)')
  .argument('<name>', 'Component name')
  .action(async (name: string) => {
    const spinner = ora(`Creating ${chalk.cyan(name)}...`).start();

    const dir = path.join(process.cwd(), 'src/components/ui', name.toLowerCase());
    await fs.ensureDir(dir);

    await fs.writeFile(path.join(dir, `${name}.tsx`), componentTemplate(name));
    await fs.writeFile(path.join(dir, `${name}.stories.tsx`), storyTemplate(name));
    await fs.writeFile(path.join(dir, 'index.ts'), `export * from './${name}';\n`);

    spinner.succeed(chalk.green(`${name} created!`));
    console.log(chalk.dim(`→ src/components/ui/${name.toLowerCase()}/${name}.tsx`));
    console.log(chalk.dim(`→ src/components/ui/${name.toLowerCase()}/${name}.stories.tsx`));
  });

program.parse();