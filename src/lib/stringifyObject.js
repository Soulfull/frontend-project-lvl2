function stringifyObject(val, replacer = ' ', count = 1) {
  const iter = (value, depth) => {
    if (typeof value !== 'object' || value === null || value === undefined) {
      return String(value);
    }

    if (Array.isArray(value)) {
      return `[${value.map((item) => stringifyObject(item)).join()}]`;
    }

    if (Object.keys(value).length === 0) {
      return '{}';
    }

    const currentCount = depth * count;
    const currentIndent = replacer.repeat(currentCount);
    const bracketsIndent = replacer.repeat(currentCount - count);
    const contents = Object.entries(value).map(([key, propVal]) => `${currentIndent}${key}: ${iter(propVal, depth + 1)}`);
    return [
      '{',
      ...contents,
      `${bracketsIndent}}`,
    ].join('\n');
  };

  return iter(val, 1);
}

export default stringifyObject;
