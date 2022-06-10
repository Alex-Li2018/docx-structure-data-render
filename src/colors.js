const colors = [
  '#dc143c',
  '#00ffff',
  '#7fffd4',
  '#ffebcd',
  '#0000ff',
  '#8a2be2',
  '#a52a2a',
  '#deb887',
  '#5f9ea0',
  '#7fff00',
  '#d2691e',
  '#ff7f50',
  '#6495ed',
  '#00ffff',
  '#00008b',
  '#008b8b',
  '#b8860b',
  '#a9a9a9',
  '#006400',
  '#bdb76b',
  '#8b008b',
  '#556b2f',
  '#ff8c00',
  '#9932cc',
  '#8b0000',
  '#e9967a',
  '#8fbc8f',
  '#483d8b',
  '#2f4f4f',
  '#00ced1',
  '#9400d3',
  '#ff1493',
  '#00bfff',
  '#696969',
  '#1e90ff',
  '#b22222',
  '#fffaf0',
  '#228b22',
  '#ff00ff',
  '#dcdcdc',
  '#f8f8ff',
  '#ffd700',
  '#daa520',
  '#808080',
  '#008000',
  '#adff2f',
  '#f0fff0',
  '#ff69b4',
  '#cd5c5c',
  '#4b0082',
  '#fffff0',
  '#f0e68c',
  '#e6e6fa',
  '#fff0f5',
  '#7cfc00',
  '#fffacd',
  '#add8e6',
  '#f08080',
  '#e0ffff',
  '#fafad2',
  '#d3d3d3',
  '#90ee90',
  '#ffb6c1',
  '#ffa07a',
  '#20b2aa',
  '#87cefa',
  '#778899',
  '#b0c4de',
  '#ffffe0',
  '#00ff00',
  '#32cd32',
  '#faf0e6',
  '#ff00ff',
  '#800000',
  '#66cdaa',
  '#0000cd',
  '#ba55d3',
  '#9370d8',
  '#3cb371',
  '#7b68ee',
  '#00fa9a',
  '#48d1cc',
  '#c71585',
  '#191970',
  '#f5fffa',
  '#ffe4e1',
  '#ffe4b5',
  '#ffdead',
  '#000080',
  '#fdf5e6',
  '#6b8e23',
  '#ffa500',
  '#ff4500',
  '#da70d6',
  '#eee8aa',
  '#98fb98',
  '#afeeee',
  '#d87093',
  '#ffefd5',
  '#ffdab9',
  '#cd853f',
  '#ffc0cb',
  '#dda0dd',
  '#b0e0e6',
  '#800080',
  '#663399',
  '#ff0000',
  '#bc8f8f',
  '#4169e1',
  '#8b4513',
  '#fa8072',
  '#f4a460',
  '#2e8b57',
  '#fff5ee',
  '#a0522d',
  '#c0c0c0',
  '#87ceeb',
  '#6a5acd',
  '#708090',
  '#fffafa',
  '#00ff7f',
  '#4682b4',
  '#d2b48c',
  '#008080',
  '#d8bfd8',
  '#ff6347',
  '#40e0d0',
  '#ee82ee',
  '#f5deb3',
  '#ffff00',
  '#9acd32',
];

// 可以通过名字映射上述颜色
const colorNames = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370d8',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#d87093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32',
};

const RGBARegEx = /^rgba\((25[0-5]|2[0-4]\d|1\d{2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d\d?)\s*(?:,\s*([01]\.?\d*?))\)$/;
const RGBRegEx = /^rgb\((25[0-5]|2[0-4]\d|1\d{2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d\d?)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|\d\d?)\s*\)$/;

// given fix colors
export function getColors(number) {
  const index = number % (colors.length);

  return colors[index];
}

// 16进制转rgb
function hexToRGBArray(hex) {
  const rgb = [0, 0, 0];
  /**
       * If HEX = 3
       */

  if (hex && hex.length === 4) {
    rgb[0] = `0x${hex[1]}${hex[1]}`;
    rgb[1] = `0x${hex[2]}${hex[2]}`;
    rgb[2] = `0x${hex[3]}${hex[3]}`;

    /**
         * If HEX = 6
         */
  } else if (hex && hex.length === 7) {
    rgb[0] = `0x${hex[1]}${hex[2]}`;
    rgb[1] = `0x${hex[3]}${hex[4]}`;
    rgb[2] = `0x${hex[5]}${hex[6]}`;
  }
  return rgb.map((x) => +x);
}

/**
     * Convert HEX to RGBA
     * 16十进制转rgba
     * @param {string} hex 3 digits + # or 6 digits + #
     * @param {number?} opacity From 0 to 1
     */
export function hexToRGBA(hex, opacity) {
  const rgb = hexToRGBArray(hex);
  let a = 0.3;

  if (typeof parseInt(opacity, 10) === 'number') {
    a = opacity;
  }

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
}

/**
     * Color to RGBA
     * 颜色简称转rgba
     * @param {*} value
     */
export function colorToRGBA(value, alpha) {
  // eslint-disable-next-line valid-typeof
  if (typeof value === 'string' && typeof colorNames[value.toLowerCase()] !== undefined) {
    const hexColor = colorNames[value.toLowerCase()];

    return hexToRGBA(hexColor, alpha);
  }

  return value;
}

/*
     * Splits a color into an array of RGBA
     * 将颜色分割为一个数组
     * @param {string} color
     */
export function colorToRGBAArray(value) {
  if (value) {
    if (value.charAt(0) === '#') {
      const colorRGBArray = hexToRGBArray(value);

      colorRGBArray.push(1);
      return colorRGBArray;
    }

    let matches;

    // eslint-disable-next-line no-cond-assign
    if ((matches = RGBARegEx.exec(value))) {
      return matches.slice(1, 5).map((x) => +x);
    }
    // eslint-disable-next-line no-cond-assign
    if ((matches = RGBRegEx.exec(value))) {
      const colorRGBArray = matches.slice(1, 4);

      colorRGBArray.push(1);
      return colorRGBArray.map((x) => +x);
    }
    // eslint-disable-next-line valid-typeof
    if (typeof value === 'string' && typeof colorNames[value.toLowerCase()] !== undefined) {
      const hexColor = colorNames[value.toLowerCase()];
      const colorRGBArray = hexToRGBArray(hexColor);

      colorRGBArray.push(1);
      return colorRGBArray;
    }
  }
  return [0, 0, 0, 1];
}

export function rgbaArrayToRGBA(rgba) {
  return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
}

/**
     * Convert color to RGB(A)
     * @param {*} value
     * @param {number} alpha
     */
export function convertToRGBA(value, alpha) {
  const rgba = colorToRGBAArray(value);

  rgba[3] = Number(alpha) === alpha ? alpha : rgba[3];
  return rgbaArrayToRGBA(rgba);
}

/**
     * Convert string to HEX color
     * @param {string} str
     */
export function stringToColor(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;

    color += (`00${value.toString(16)}`).substr(-2);
  }

  return color;
}

/**
     * Change alpha channel of RGBA
     * 增加透明度
     * @param {string} rgba
     * @param {number} alpha from 0 to 1
     */
export function rgbaChangeAlpha(rgba, alpha) {
  return rgba.replace(/[\d\.]+\)$/g, `${alpha})`); // eslint-disable-line no-useless-escape
}

/**
     * Removes alpha channel by merging the color with `base`
     * 去掉透明色
     * @param {number} r Red channel
     * @param {number} g Green channel
     * @param {number} b Blue channel
     * @param {number} a Alpha channel
     * @param {[number, number, number, number]} base White by default
     */
export const removeAlpha = (r, g, b, a, base = [255, 255, 255, 1]) => {
  const mix = [];

  mix[3] = 1 - (1 - a) * (1 - base[3]); // alpha
  mix[0] = Math.round((r * a) / mix[3] + (base[0] * base[3] * (1 - a)) / mix[3]); // red
  mix[1] = Math.round((g * a) / mix[3] + (base[1] * base[3] * (1 - a)) / mix[3]); // green
  mix[2] = Math.round((b * a) / mix[3] + (base[2] * base[3] * (1 - a)) / mix[3]); // blue

  return mix;
};

/**
     * Determine contrasting color for a given color
     * Uses official W3C formula to make calculations
     * @param {string} color
     */
export const contrastColor = (color) => {
  const [r, g, b] = removeAlpha(...color.match(/([0-9.]{1,3})/g).map(Number));
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'rgb(0,0,0)' : 'rgb(255,255,255)';
};

/**
     * rgb的数组转16进制
     * @param {string} color
     */
export function rgbArrayToHex(value) {
  // eslint-disable-next-line no-bitwise
  const color = value.slice(0, 3).map((x) => (x | (1 << 8)).toString(16).slice(1));

  color.unshift('#');
  return color.join('');
}
