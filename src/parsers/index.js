import yaml from 'js-yaml';

const getParse = (ext) => {
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load;
  }
  return JSON.parse;
};

export default getParse;
