import BasePart from '../basePart';
import {
  createStyleElement,
  appendComment,
} from '../utils';

// 主题 字体 颜色
class RenderTheme extends BasePart {
  constructor(themePart, className) {
    super();
    this.themePart = themePart;
    this.className = className;
  }

  render(styleContainer) {
    appendComment(styleContainer, 'docxjs document theme values');
    this.renderTheme(styleContainer);
  }

  renderTheme(styleContainer) {
    const variables = {};
    const fontScheme = this.themePart.props && this.themePart.props.fontScheme;
    // 字体
    if (fontScheme) {
      if (fontScheme.majorFont) {
        variables['--docx-majorHAnsi-font'] = fontScheme.majorFont.latinTypeface;
      }

      if (fontScheme.minorFont) {
        variables['--docx-minorHAnsi-font'] = fontScheme.minorFont.latinTypeface;
      }
    }

    const colorScheme = this.themePart.props && this.themePart.props.colorScheme;
    // 颜色
    if (colorScheme) {
      for (const [k, v] of Object.entries(colorScheme.colors)) {
        variables[`--docx-${k}-color`] = `#${v}`;
      }
    }

    const cssText = this.styleToString(`.${this.className}`, variables);
    styleContainer.appendChild(createStyleElement(cssText));
  }
}

export default RenderTheme;
