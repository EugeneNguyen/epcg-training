#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const args = require('args');
const lodash = require('lodash');
const Mustache = require('mustache');

const baseModelPath = '../backend/src/models/';
const UTF8 = 'utf8';

args
  .option('table', 'Table name')

const flags = args.parse(process.argv)

const auto_data = loadData(flags.table);
createFolder(auto_data);
loadTemplates(auto_data);

function loadData(table) {
  return yaml.load(fs.readFileSync(`../models/consolidated/${table}.yaml`, UTF8));
}

function createFolder(data) {
  fs.mkdirSync(modelFolderPath(data.modelName), {recursive: true});
}

function loadTemplates(data) {
  readDir('templates')
    .filter(file => path.basename(file).startsWith('temp_'))
    .map(file => generate(file, data));
}

function readDir(dirPath) {
  return fs
    .readdirSync(path.join(__dirname, dirPath))
    .reduce((total, file) => {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(path.join(__dirname, filePath)).isDirectory()) {
        total = [...total, ...readDir(filePath)];
      } else {
        total.push(filePath);
      }
      return total;
    }, [])
}

function generate(templatePath, data) {
  const template = loadTemplate(templatePath);
  const content = Mustache.render(template, data);
  saveJSFile(data.modelName, templatePath.replace("templates/", "").replace("temp_", ""), content);
}

function loadTemplate(file) {
  const templatePath = path.join(__dirname, file);
  return fs.readFileSync(templatePath, UTF8);
}

function saveJSFile(table, file, content) {
  fs.mkdirSync(path.join(modelFolderPath(table), path.dirname(file)), {recursive: true});
  fs.writeFileSync(modelFilePath(table, `${file}.js`), content, UTF8)
}

function modelFolderPath(table) {
  return path.join(baseModelPath, lodash.snakeCase(table));
}

function modelFilePath(table, file) {
  return path.join(modelFolderPath(table), file);
}
