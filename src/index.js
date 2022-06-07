import {
    createElement,
    removeAllElements,
    createStyleElement,
    appendComment,
    keyBy,
} from './utils'
import { renderDefaultStyle } from './render/defaultStyle'
import RenderTheme from './render/theme'
import RenderStyle from './render/style'
import RenderNumbering from './render/numbering'
import RenderFontTable from './render/fontTable'

import backJSON from './back'

class HtmlRenderer {
    constructor(htmlDocument) {
        this.htmlDocument = htmlDocument;
        this.footnoteMap = {};
        this.endnoteMap = {};
        this.defaultTabSize = []
        // this.styleMap = {};
        // this.currentPart = null;
        // this.tableVerticalMerges = [];
        // this.currentVerticalMerge = null;
        // this.tableCellPositions = [];
        // this.currentCellPosition = null;
        
        // this.currentEndnoteIds = [];
        // this.usedHederFooterParts = [];
        // this.currentTabs = [];
        // this.tabsTimeout = 0;
        // this.createElement = createElement;
    }

    /**
     * 渲染函数
     * @param {*} document wordDocumnetJson
     * @param {*} bodyContainer 最外层的容器
     * @param {*} styleContainer style标签的容器
     * @param {*} options 选项
     */
    render(document, bodyContainer, styleContainer, options) {
        if (styleContainer === void 0) { 
            styleContainer = null; 
        }

        styleContainer = styleContainer || bodyContainer;

        const className = options.className || 'docx';

        removeAllElements(styleContainer);
        removeAllElements(bodyContainer);
        appendComment(styleContainer, "docxjs library predefined styles");
        styleContainer.appendChild(renderDefaultStyle());

        // 渲染主题
        if (document.themePart) {
            new RenderTheme(document.themePart, className).render(styleContainer)
        }

        // 渲染style part
        if (document.stylesPart != null) {
            new RenderStyle(document.stylesPart, options).render(styleContainer)
        }

        // 编号
        if (document.numberingPart) {
			new RenderNumbering(document.numberingPart).render(styleContainer)
		}

        // 页眉
        if (document.footnotesPart) {
            this.footnoteMap = keyBy(document.footnotesPart.notes, x => x.id);
        }

        // 页脚
        if (document.endnotesPart) {
            this.endnoteMap = keyBy(document.endnotesPart.notes, x => x.id);
        }

        // 设置
        if (document.settingsPart) {
            this.defaultTabSize = document.settingsPart.props && document.settingsPart.props.defaultTabStop ? document.settingsPart.props.defaultTabStop : null;
        }

        if (!options.ignoreFonts && document.fontTablePart) {
            new RenderFontTable(document.fontTablePart).render(styleContainer);
        }

        // const sectionElements = this.renderSections(document.documentPart.body);

        // if (this.options.inWrapper) {
        //     bodyContainer.appendChild(this.renderWrapper(sectionElements));
        // } else {
        //     appendChildren(bodyContainer, sectionElements);
        // }

        // this.refreshTabStops();
    }
}

function arrayToObject(data) {
    const obj = {}

    for(let key of data) {
        obj[key.type] = key
    }

    return obj
}

// 测试
new HtmlRenderer(window.htmlDocument)
.render(arrayToObject(backJSON.data), document.getElementById('docx'), null, { className: 'docx' })