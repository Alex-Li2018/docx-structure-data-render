import {
  createElement,
  appendChildren,
  createSvgElement,
} from '../utils';
import {
  getColors,
} from '../colors';
import DomType from './domType';
import BasePart from '../basePart';

class RenderBody extends BasePart {
  constructor(document, options, styleMap, footnoteMap, endnoteMap, defaultTabSize, htmlDocument) {
    super();

    this.document = document;
    this.currentPart = null;
    this.tableVerticalMerges = [];
    this.currentVerticalMerge = null;
    this.tableCellPositions = [];
    this.currentCellPosition = null;

    this.currentEndnoteIds = [];
    this.usedHederFooterParts = [];
    this.currentTabs = [];
    this.tabsTimeout = 0;
    this.createElement = createElement;
    this.options = {
      breakPages: true,
      className: 'docx',
      ignoreFonts: false,
      ignoreHeight: false,
      ignoreLastRenderedPageBreak: true,
      ignoreWidth: false,
      inWrapper: true,
      renderEndnotes: true,
      renderFooters: true,
      renderFootnotes: true,
      renderHeaders: true,
      trimXmlDeclaration: true,
      useBase64URL: false,
      ...options,
    };

    this.className = this.options.className || 'docx';

    this.styleMap = styleMap;
    this.footnoteMap = footnoteMap;
    this.endnoteMap = endnoteMap;
    this.defaultTabSize = defaultTabSize;

    this.htmlDocument = htmlDocument;

    this.labelEntityArr = [];
  }

  render() {
    const result = [];
    // 遍历元素调整label标签
    this.processLabelElement(this.document);
    // 遍历元素处理表格 处理父元素节点
    this.processElement(this.document);
    // 分页 一页一个section
    const sections = this.splitBySection(this.document.children);
    let prevProps = null;

    for (let i = 0, l = sections.length; i < l; i++) {
      this.currentFootnoteIds = [];

      const section = sections[i];
      const props = section.sectProps || this.document.props;
      // 创建当前页
      const sectionElement = this.createSection(this.className, props);
      // 渲染word解析出来的样式
      this.renderStyleValues(this.document.cssStyle, sectionElement);

      // 页眉页脚
      this.options.renderHeaders && this.renderHeaderFooter(
        props.headerRefs,
        props,
        result.length,
        prevProps !== props,
        sectionElement,
      );

      const contentElement = this.createElement('article');
      // 渲染当前页
      this.renderElements(section.elements, contentElement);
      sectionElement.appendChild(contentElement);

      if (this.options.renderFootnotes) {
        this.renderNotes(this.currentFootnoteIds, this.footnoteMap, sectionElement);
      }

      if (this.options.renderEndnotes && i === l - 1) {
        this.renderNotes(this.currentEndnoteIds, this.endnoteMap, sectionElement);
      }

      this.options.renderFooters && this.renderHeaderFooter(
        props.footerRefs,
        props,
        result.length,
        prevProps !== props,
        sectionElement,
      );

      result.push(sectionElement);
      prevProps = props;
    }

    return result;
  }

  renderElements(elems, into) {
    if (elems == null) return null;

    const result = elems.map((e) => this.renderElement(e)).filter((e) => e != null);

    if (into) appendChildren(into, result);

    return result;
  }

  renderElement(elem) {
    switch (elem.type) {
      // 段落
      case DomType.Paragraph:
        return this.renderParagraph(elem);
      // 书签开始
      case DomType.BookmarkStart:
        return this.renderBookmarkStart(elem);
      // 书签结束
      case DomType.BookmarkEnd:
        return null; // ignore bookmark end
      // run标签
      case DomType.Run:
      case DomType.renderRun:
        return this.renderRun(elem);
      // table
      case DomType.Table:
        return this.renderTable(elem);
      case DomType.Row:
        return this.renderTableRow(elem);
      case DomType.Cell:
        return this.renderTableCell(elem);
      // 超链接
      case DomType.Hyperlink:
        return this.renderHyperlink(elem);
      // 图形
      case DomType.Drawing:
        return this.renderDrawing(elem);
      // 图片
      case DomType.Image:
        return this.renderImage(elem);
      // 文本
      case DomType.Text:
        return this.renderText(elem);
      case DomType.Tab:
        return this.renderTab(elem);
      case DomType.Symbol:
        return this.renderSymbol(elem);
      case DomType.Break:
        return this.renderBreak(elem);
      case DomType.Footer:
        return this.renderContainer(elem, 'footer');
      case DomType.Header:
        return this.renderContainer(elem, 'header');
      // 脚注 尾注
      case DomType.Footnote:
      case DomType.Endnote:
        return this.renderContainer(elem, 'li');
      case DomType.FootnoteReference:
        return this.renderFootnoteReference(elem);
      case DomType.EndnoteReference:
        return this.renderEndnoteReference(elem);
      case DomType.NoBreakHyphen:
        return this.createElement('wbr');
      case DomType.VmlPicture:
        return this.renderVmlPicture(elem);
      case DomType.VmlShape:
        return this.renderVmlShape(elem);

      default:
        break;
    }

    return null;
  }

  renderHeaderFooter(refs, props, page, firstOfSection, into) {
    if (!refs) return;

    const ref = (props.titlePage && firstOfSection ? refs.find((x) => x.type === 'first') : null)
|| (page % 2 === 1 ? refs.find((x) => x.type === 'even') : null)
|| refs.find((x) => x.type === 'default');

    const part = ref && this.document.findPartByRelId(ref.id, this.document.documentPart);

    if (part) {
      this.currentPart = part;
      if (!this.usedHederFooterParts.includes(part.path)) {
        this.processElement(part.rootElement);
        this.usedHederFooterParts.push(part.path);
      }
      this.renderElements([part.rootElement], into);
      this.currentPart = null;
    }
  }

  renderNotes(noteIds, notesMap, into) {
    const notes = noteIds.map((id) => notesMap[id]).filter((x) => x);

    if (notes.length > 0) {
      const result = this.createElement('ol', null, this.renderElements(notes));
      into.appendChild(result);
    }
  }

  renderParagraph(elem) {
    const result = this.createElement('p');

    const style = this.findStyle(elem.styleName);
    elem.tabs = (style && style.paragraphProps && style.paragraphProps.tabs)
      ? style.paragraphProps.tabs : null; // TODO

    this.renderClass(elem, result);
    this.renderChildren(elem, result);
    this.renderStyleValues({
      ...elem.cssStyle,
    }, result);
    this.renderCommonProperties(result.style, elem);

    const numbering = elem.numbering
    || ((style && style.paragraphProps && style.paragraphProps.numbering)
      ? style.paragraphProps.numbering : null);

    if (numbering) {
      result.classList.add(this.numberingClass(numbering.id, numbering.level));
    }

    return result;
  }

  renderClass(input, ouput) {
    if (input.className) ouput.className = input.className;

    if (input.styleName) ouput.classList.add(this.processStyleName(input.styleName));
  }

  renderChildren(elem, into) {
    return this.renderElements(elem.children, into);
  }

  renderStyleValues(style, ouput) {
    Object.assign(ouput.style, style);
  }

  renderCommonProperties(style, props) {
    if (props == null) return;

    if (props.color) {
      style.color = props.color;
    }

    if (props.fontSize) {
      style['font-size'] = props.fontSize;
    }
  }

  renderBookmarkStart(elem) {
    const result = this.createElement('span');
    result.id = elem.name;
    return result;
  }

  renderRun(elem) {
    if (elem.fieldRun) return null;

    const result = this.createElement('span');

    if (elem.id) result.id = elem.id;

    this.renderClass(elem, result);
    this.renderStyleValues(elem.cssStyle, result);

    if (elem.verticalAlign) {
      const wrapper = this.createElement(elem.verticalAlign);
      this.renderChildren(elem, wrapper);
      result.appendChild(wrapper);
    } else {
      this.renderChildren(elem, result);
    }

    return result;
  }

  renderTable(elem) {
    const result = this.createElement('table');

    this.tableCellPositions.push(this.currentCellPosition);
    this.tableVerticalMerges.push(this.currentVerticalMerge);
    this.currentVerticalMerge = {};
    this.currentCellPosition = { col: 0, row: 0 };

    if (elem.columns) result.appendChild(this.renderTableColumns(elem.columns));

    this.renderClass(elem, result);
    this.renderChildren(elem, result);
    this.renderStyleValues(elem.cssStyle, result);

    this.currentVerticalMerge = this.tableVerticalMerges.pop();
    this.currentCellPosition = this.tableCellPositions.pop();

    return result;
  }

  renderTableColumns(columns) {
    const result = this.createElement('colgroup');

    for (const col of columns) {
      const colElem = this.createElement('col');

      if (col.width) colElem.style.width = col.width;

      result.appendChild(colElem);
    }

    return result;
  }

  renderTableRow(elem) {
    const result = this.createElement('tr');

    this.currentCellPosition.col = 0;

    this.renderClass(elem, result);
    this.renderChildren(elem, result);
    this.renderStyleValues(elem.cssStyle, result);

    this.currentCellPosition.row++;

    return result;
  }

  renderTableCell(elem) {
    const result = this.createElement('td');

    if (elem.verticalMerge) {
      const key = this.currentCellPosition.col;

      if (elem.verticalMerge === 'restart') {
        this.currentVerticalMerge[key] = result;
        result.rowSpan = 1;
      } else if (this.currentVerticalMerge[key]) {
        this.currentVerticalMerge[key].rowSpan += 1;
        result.style.display = 'none';
      }
    }

    this.renderClass(elem, result);
    this.renderChildren(elem, result);
    this.renderStyleValues(elem.cssStyle, result);

    if (elem.span) result.colSpan = elem.span;

    this.currentCellPosition.col++;

    return result;
  }

  renderHyperlink(elem) {
    const result = this.createElement('a');

    this.renderChildren(elem, result);
    this.renderStyleValues(elem.cssStyle, result);

    if (elem.href) result.href = elem.href;

    return result;
  }

  renderDrawing(elem) {
    const result = this.createElement('div');

    result.style.display = 'inline-block';
    result.style.position = 'relative';
    result.style.textIndent = '0px';

    this.renderChildren(elem, result);
    this.renderStyleValues(elem.cssStyle, result);

    return result;
  }

  renderImage(elem) {
    const result = this.createElement('img');

    this.renderStyleValues(elem.cssStyle, result);

    if (this.document) {
      this.document.loadDocumentImage(elem.src, this.currentPart).then((x) => {
        result.src = x;
      });
    }

    return result;
  }

  renderText(elem) {
    return this.htmlDocument.createTextNode(elem.text);
  }

  renderBreak(elem) {
    if (elem.break === 'textWrapping') {
      return this.createElement('br');
    }

    return null;
  }

  renderSymbol(elem) {
    const span = this.createElement('span');
    span.style.fontFamily = elem.font;
    span.innerHTML = `&#x${elem.char};`;
    return span;
  }

  renderContainer(elem, tagName) {
    return this.createElement(tagName, null, this.renderChildren(elem));
  }

  renderVmlPicture(elem) {
    const result = createSvgElement('svg');
    this.renderChildren(elem, result);

    setTimeout(() => {
      const bb = result.getBBox();

      result.setAttribute('width', `${Math.round(bb.width)}`);
      result.setAttribute('height', `${Math.round(bb.height)}`);
    });

    return result;
  }

  renderVmlShape(elem) {
    if (elem.imagedata) {
      const image = createSvgElement('image');

      image.setAttribute('style', elem.cssStyleText);

      if (this.document) {
        this.document.loadDocumentImage(elem.imagedata.id, this.currentPart).then((x) => {
          image.setAttribute('href', x);
        });
      }

      return image;
    }

    return null;
  }

  numberingClass(id, lvl) {
    return `${this.className}-num-${id}-${lvl}`;
  }

  findStyle(styleName) {
    return styleName && this.styleMap && this.styleMap[styleName];
  }

  splitBySection(elements) {
    let current = { sectProps: null, elements: [] };
    const result = [current];
    let sectProps = null;

    for (const elem of elements) {
      if (elem.type === DomType.Paragraph) {
        const s = this.findStyle(elem.styleName);

        if (s?.paragraphProps?.pageBreakBefore) {
          current.sectProps = sectProps;
          current = { sectProps: null, elements: [] };
          result.push(current);
        }
      }

      current.elements.push(elem);

      if (elem.type === DomType.Paragraph) {
        const p = elem;

        sectProps = p.sectionProps;
        let pBreakIndex = -1;
        let rBreakIndex = -1;

        if (this.options.breakPages && p.children) {
          pBreakIndex = p.children.findIndex((r) => {
            rBreakIndex = r.children?.findIndex(this.isPageBreakElement.bind(this)) ?? -1;
            return rBreakIndex !== -1;
          });
        }

        if (sectProps || pBreakIndex !== -1) {
          current.sectProps = sectProps;
          current = { sectProps: null, elements: [] };
          result.push(current);
        }

        if (pBreakIndex !== -1) {
          const breakRun = p.children[pBreakIndex];
          const splitRun = rBreakIndex < breakRun.children.length - 1;

          if (pBreakIndex < p.children.length - 1 || splitRun) {
            const { children } = elem;
            const newParagraph = { ...elem, children: children.slice(pBreakIndex) };
            elem.children = children.slice(0, pBreakIndex);
            current.elements.push(newParagraph);

            if (splitRun) {
              const runChildren = breakRun.children;
              const newRun = { ...breakRun, children: runChildren.slice(0, rBreakIndex) };
              elem.children.push(newRun);
              breakRun.children = runChildren.slice(rBreakIndex);
            }
          }
        }
      }
    }

    let currentSectProps = null;

    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i].sectProps == null) {
        result[i].sectProps = currentSectProps;
      } else {
        currentSectProps = result[i].sectProps;
      }
    }

    return result;
  }

  processLabelElement(element) {
    // 定义变化 抽取的实体与tree节点之间的关系
    const flag = {
      // 全等
      equal: 0,
      // 组合
      combination: 1,
      // 分割
      segmentation: 2,
    };

    // 遍历paragraph 获取所有的text节点
    const traverseParagraph = (node) => {
      const arrRun = [];

      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const e = node.children[i];

          if (e.type === DomType.Run) {
            arrRun.push({
              runElement: e,
              // TODO: 假定一个run下只有一个text
              text: e.children.filter((item) => item.type === 'text').map((item) => item.text).toString(),
            });
          }
        }
      }

      return arrRun;
    };

    // 判断是哪一个类型
    const handlerRunNode = (label, runArr) => {
      const arr = [];
      const { entity, value } = label;
      const index = this.labelEntityArr.findIndex((item) => item === entity);
      const background = getColors(
        index === -1 ? this.labelEntityArr.push(entity) - 1 : index,
      );
      const combinationArr = [];
      const combinationIndex = [];
      const segmentationArr = [];

      let combinationText = value;

      for (let i = 0; i < runArr.length; i++) {
        const { text } = runArr[i];

        if (text === value) {
          // equal
          runArr[i].runElement = {
            children: runArr[i].runElement.children,
            cssStyle: {
              ...runArr[i].cssStyle,
              background,
            },
            data: {
              entity,
              value,
            },
            type: 'run',
          };
          arr.push(runArr[i].runElement);
        } else if (combinationText.startsWith(text)) {
          // combination
          runArr[i].entity = entity;
          runArr[i].flag = flag.combination;
          runArr[i].background = background;
          runArr[i].value = value;
          combinationText = combinationText.substring(text.length);
          combinationArr.push(runArr[i]);
          combinationIndex.push(i);
          arr.push(runArr[i].runElement);
        } else if (text.includes(value)) {
          // segmentation
          const textArr = [];
          const startIndex = text.indexOf(value);
          textArr.push(text.substring(0, startIndex));
          textArr.push(text.substring(startIndex, startIndex + value.length));
          textArr.push(text.substring(startIndex + value.length + 1));

          textArr.filter((item) => !!item).forEach((item) => {
            const obj = {
              index: i,
              text: item,
            };

            const runElement = {
              children: [
                {
                  text: item,
                  type: 'text',
                },
              ],
              cssStyle: {
                // eslint-disable-next-line max-len
                ...(runArr[i].runElement && runArr[i].runElement.cssStyle ? runArr[i].runElement.cssStyle : {}),
              },
              data: {
                entity,
                value,
              },
              type: 'run',
            };

            if (item === value) {
              runElement.cssStyle.background = background;
            }

            obj.runElement = runElement;

            segmentationArr.push(obj);

            arr.push(runElement);
          });
        } else {
          arr.push(runArr[i].runElement);
        }
      }

      // 修改runArr
      // eslint-disable-next-line max-len
      segmentationArr.length && runArr.splice(segmentationArr[0].index, segmentationArr.length, ...segmentationArr);
      // 处理合并节点
      if (combinationIndex.length) {
        const runElement = {
          children: combinationArr.map((item) => item.runElement),
          cssStyle: {
            background: combinationArr[0].background,
          },
          data: {
            value: combinationArr[0].value,
            entity: combinationArr[0].entity,
          },
          type: 'renderRun',
        };
        arr.splice(combinationIndex[0], combinationIndex.length, runElement);

        // 修改runArr
        runArr.splice(combinationIndex[0], combinationIndex.length, {
          runElement,
          text: combinationArr[0].value,
        });
      }

      return arr;
    };

    if (element.children) {
      for (const e of element.children) {
        if (e.type === 'paragraph' && e.label && e.label.length) {
          const runArr = traverseParagraph(e);
          let newRunArr = [];
          // 处理多标签的问题
          for (const label of e.label) {
            newRunArr = handlerRunNode(label, runArr);
          }

          e.children = newRunArr;
        }
      }
    }
  }

  processElement(element) {
    if (element.children) {
      for (const e of element.children) {
        e.parent = element;

        if (e.type === DomType.Table) {
          this.processTable(e);
        } else {
          this.processElement(e);
        }
      }
    }
  }

  createSection(className, props) {
    const elem = this.createElement('section', { className });

    if (props) {
      if (props.pageMargins) {
        elem.style.paddingLeft = props.pageMargins.left;
        elem.style.paddingRight = props.pageMargins.right;
        elem.style.paddingTop = props.pageMargins.top;
        elem.style.paddingBottom = props.pageMargins.bottom;
      }

      if (props.pageSize) {
        if (!this.options.ignoreWidth) elem.style.width = props.pageSize.width;
        if (!this.options.ignoreHeight) elem.style.minHeight = props.pageSize.height;
      }

      if (props.columns && props.columns.numberOfColumns) {
        elem.style.columnCount = `${props.columns.numberOfColumns}`;
        elem.style.columnGap = props.columns.space;

        if (props.columns.separator) {
          elem.style.columnRule = '1px solid black';
        }
      }
    }

    return elem;
  }

  isPageBreakElement(elem) {
    if (elem.type !== DomType.Break) return false;

    if (elem.break === 'lastRenderedPageBreak') return !this.options.ignoreLastRenderedPageBreak;

    return elem.break === 'page';
  }
}

export default RenderBody;
