import BasePart from '../basePart';
import {
  createStyleElement,
  appendComment,
} from '../utils';

// 导入字体文件
class RenderFontTable extends BasePart {
  constructor(fontsPart) {
    super();
    this.fontsPart = fontsPart;
  }

  render(styleContainer) {
    for (const f of this.fontsPart.props) {
      //
      for (const ref of f.embedFontRefs) {
        this.document.loadFont(ref.id, ref.key).then((fontData) => {
          const cssValues = {
            'font-family': f.name,
            src: `url(${fontData})`,
          };

          if (ref.type === 'bold' || ref.type === 'boldItalic') {
            cssValues['font-weight'] = 'bold';
          }

          if (ref.type === 'italic' || ref.type === 'boldItalic') {
            cssValues['font-style'] = 'italic';
          }

          appendComment(styleContainer, `docxjs ${f.name} font`);
          const cssText = this.styleToString('@font-face', cssValues);
          styleContainer.appendChild(createStyleElement(cssText));
          // this.refreshTabStops();
        });
      }
    }
  }
}

export default RenderFontTable;
