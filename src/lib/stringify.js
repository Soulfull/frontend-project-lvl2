import { getSign } from './getSign';

const stringify = (data) => {
  const contents = data.map((node) => {
    const sign = getSign(node.status);
    return `  ${sign} ${node.key}: ${node.value}`;
  });
  return ['{', ...contents, '}'].join('\n');
};

export default stringify;
