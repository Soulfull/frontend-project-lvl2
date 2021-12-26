#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();
program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>');
program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program.parse();