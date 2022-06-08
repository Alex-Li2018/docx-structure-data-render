import {
  escapeClassName,
} from './utils';

class BasePart {
  // eslint-disable-next-line no-empty-function
  constructor() {
  }

  numberingClass(id, lvl) {
    return `${this.className}-num-${id}-${lvl}`;
  }

  numberingCounter(id, lvl) {
    return `${this.className}-num-${id}-${lvl}`;
  }

  numFormatToCssValue(format) {
    const mapping = {
      none: 'none',
      bullet: 'disc',
      decimal: 'decimal',
      lowerLetter: 'lower-alpha',
      upperLetter: 'upper-alpha',
      lowerRoman: 'lower-roman',
      upperRoman: 'upper-roman',
    };

    return mapping[format] || format;
  }

  processStyleName(className) {
    return className ? `${this.className}_${escapeClassName(className)}` : this.className;
  }

  copyStyleProperties(input, output, attrs) {
    if (!input) return output;

    if (output == null) output = {};
    if (attrs == null) attrs = Object.getOwnPropertyNames(input);

    for (const key of attrs) {
      if (input.hasOwnProperty(key) && !output.hasOwnProperty(key)) output[key] = input[key];
    }

    return output;
  }

  styleToString(selectors, values, cssText) {
    let result = `${selectors} {\r\n`;

    for (const key in values) {
      result += `  ${key}: ${values[key]};\r\n`;
    }

    if (cssText) result += cssText;

    return `${result}}\r\n`;
  }

  render() {

  }
}

export default BasePart;
