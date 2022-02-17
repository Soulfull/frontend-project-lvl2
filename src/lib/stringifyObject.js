const stringifyObject = (val, replacer, depth) => {
  const iter = (value, currentDepth) => {
    if (typeof value !== 'object' || value === null || value === undefined) {
      return String(value);
    }

    const currentIndent = replacer.repeat(currentDepth);
    const bracketsIndent = replacer.repeat(currentDepth - 1);
    const contents = Object.entries(value).map(([key, propVal]) => `${currentIndent}${key}: ${iter(propVal, currentDepth + 1)}`);
    return [
      '{',
      ...contents,
      `${bracketsIndent}}`,
    ].join('\n');
  };

  return iter(val, depth);
};

export default stringifyObject;
