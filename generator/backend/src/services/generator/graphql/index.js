#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const ejs = require('ejs');
const constant = require('../../../constant');
const helpers = require('../../../helpers');

const UTF8 = 'utf8';
const templatesFolder = '../../../../../templates/graphql';

function execute(table) {
  const auto_data = helpers.yml.read(constant.modelPath(`consolidated/${table}.yaml`));
  createFolder(auto_data);
  loadTemplates(auto_data);
}

function createFolder(data) {
  fs.mkdirSync(modelFolderPath(data.modelName), {recursive: true});
}

function loadTemplates(data) {
  readDir(templatesFolder)
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
  const content = ejs.render(template, data);
  saveJSFile(data.modelName, templatePath.replace(templatesFolder, "").replace("temp_", "").replace(".ejs", ""), content);
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
  return constant.graphqlPath(lodash.snakeCase(table));
}

function modelFilePath(table, file) {
  return path.join(modelFolderPath(table), file);
}

module.exports = execute;