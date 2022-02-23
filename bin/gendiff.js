#!/usr/bin/env node
import { Command } from 'commander';
import outputDiff from '../src/outputDiff.js';

const program = new Command();
program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>');
program
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    const { format: formatType } = program.opts();
    outputDiff([filepath1, filepath2], formatType);
  })
  .option('-f, --format [type]', 'output format', 'stylish');

program.parse(process.argv);
