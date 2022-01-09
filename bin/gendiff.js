#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>');
program
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
