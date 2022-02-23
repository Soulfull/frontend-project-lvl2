import yamlParser from './parsers/yamlParser.js';
import jsonParser from './parsers/jsonParser.js';

const getParse = (ext) => {
  if (ext === '.yaml' || ext === '.yml') {
    return yamlParser;
  }
  return jsonParser;
};

export default getParse;
