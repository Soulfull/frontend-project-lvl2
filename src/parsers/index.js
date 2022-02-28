import yamlParser from './yamlParser.js';
import jsonParser from './jsonParser.js';

const getParse = (ext) => {
  if (ext === '.yaml' || ext === '.yml') {
    return yamlParser;
  }
  return jsonParser;
};

export default getParse;
