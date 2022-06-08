(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HtmlRender = factory());
})(this, (function () { 'use strict';

    // 创建元素
    function createElement(tagName, props, children) {
        return createElementNS(undefined, tagName, props, children);
    }

    function createElementNS(ns, tagName, props, children) {
        var result = ns ? document.createElementNS(ns, tagName) : document.createElement(tagName);
        Object.assign(result, props);
        children && appendChildren(result, children);
        return result;
    }

    function removeAllElements(elem) {
        elem.innerHTML = '';
    }

    function appendChildren(elem, children) {
        children.forEach(function (c) { return elem.appendChild(c); });
    }

    function createStyleElement(cssText) {
        return createElement("style", { innerHTML: cssText });
    }

    function appendComment(elem, comment) {
        elem.appendChild(document.createComment(comment));
    }

    function keyBy(array, by) {
        return array.reduce((a, x) => {
                a[by(x)] = x;
                return a;
            }, {}
        );
    }

    function escapeClassName(className) {
    	return (className || '').replace(/[ .]+/g, '-').replace(/[&]+/g, 'and').toLowerCase();
    }

    function isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }

    function mergeDeep(target, ...sources) {
        if (!sources.length) 
            return target;
        
        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    const val = target[key] || (target[key] = {});
                    mergeDeep(val, source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }

        return mergeDeep(target, ...sources);
    }

    // css 变量

    function renderDefaultStyle(className) {
        const c = className;
        const styleText = `
.${c}-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } 
.${c}-wrapper>section.${c} { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }
.${c} { color: black; }
section.${c} { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }
section.${c}>article { margin-bottom: auto; }
.${c} table { border-collapse: collapse; }
.${c} table td, .${c} table th { vertical-align: top; }
.${c} p { margin: 0pt; min-height: 1em; }
.${c} span { white-space: pre-wrap; overflow-wrap: break-word; }
.${c} a { color: inherit; text-decoration: inherit; }
`;

        return createStyleElement(styleText);
    }

    class BasePart {
        constructor() {

        }

    	numberingClass(id, lvl) {
    		return `${this.className}-num-${id}-${lvl}`;
    	}

    	numberingCounter(id, lvl) {
    		return `${this.className}-num-${id}-${lvl}`;
    	}

    	numFormatToCssValue(format) {
    		var mapping = {
    			"none": "none",
    			"bullet": "disc",
    			"decimal": "decimal",
    			"lowerLetter": "lower-alpha",
    			"upperLetter": "upper-alpha",
    			"lowerRoman": "lower-roman",
    			"upperRoman": "upper-roman",
    		};

    		return mapping[format] || format;
    	}

        processStyleName(className) {
    		return className ? `${this.className}_${escapeClassName(className)}` : this.className;
    	}

        copyStyleProperties(input, output, attrs) {
    		if (!input)
    			return output;

    		if (output == null) output = {};
    		if (attrs == null) attrs = Object.getOwnPropertyNames(input);

    		for (var key of attrs) {
    			if (input.hasOwnProperty(key) && !output.hasOwnProperty(key))
    				output[key] = input[key];
    		}

    		return output;
    	}

        styleToString(selectors, values, cssText) {
    		let result = `${selectors} {\r\n`;

    		for (const key in values) {
    			result += `  ${key}: ${values[key]};\r\n`;
    		}

    		if (cssText)
    			result += cssText;

    		return result + "}\r\n";
    	}

        render() {
            
        }
    }

    // 主题 字体 颜色
    class RenderTheme extends BasePart {
        constructor(themePart, className) {
    		super();
    		this.themePart = themePart;
    		this.className = className;
        }

        render(styleContainer) {
            appendComment(styleContainer, "docxjs document theme values");
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
    			for (let [k, v] of Object.entries(colorScheme.colors)) {
    				variables[`--docx-${k}-color`] = `#${v}`;
    			}
    		}

    		const cssText = this.styleToString(`.${this.className}`, variables);
    		styleContainer.appendChild(createStyleElement(cssText));
        }
    }

    // 样式
    class RenderStyle extends BasePart {
        constructor(stylesPart, options) {
    		super();
    		this.stylesPart = stylesPart;
    		this.styleMap = null;
    		this.options = {
    			debug: false,
    			...options
    		};
    		this.className = options.className;
        }

        render(styleContainer) {
            this.styleMap = this.processStyles(this.stylesPart.props);
            appendComment(styleContainer, "docxjs document styles");
            styleContainer.appendChild(this.renderStyles(this.stylesPart.props));
        }

        renderStyles(styles) {
    		let styleText = "";
    		const defautStyles = keyBy(styles.filter(s => s.isDefault), s => s.target);

    		for (const style of styles) {
    			let subStyles = style.styles;

    			if (style.linked) {
    				const linkedStyle = style.linked && this.styleMap[style.linked];

    				if (linkedStyle)
    					subStyles = subStyles.concat(linkedStyle.styles);
    				else if (this.options.debug)
    					console.warn(`Can't find linked style ${style.linked}`);
    			}

    			for (const subStyle of subStyles) {
    				//TODO temporary disable modificators until test it well
    				let selector = `${style.target || ''}.${style.cssName}`;

    				if (style.target != subStyle.target)
    					selector += ` ${subStyle.target}`;

    				if (defautStyles[style.target] == style)
    					selector = `.${this.className} ${style.target}, ` + selector;

    				styleText += this.styleToString(selector, subStyle.values);
    			}
    		}

    		return createStyleElement(styleText);
    	}

    	processStyles(styles) {
    		const stylesMap = keyBy(styles.filter(x => x.id != null), x => x.id);

    		for (const style of styles.filter(x => x.basedOn)) {
    			const baseStyle = stylesMap[style.basedOn];

    			if (baseStyle) {
    				style.paragraphProps = mergeDeep(style.paragraphProps, baseStyle.paragraphProps);
    				style.runProps = mergeDeep(style.runProps, baseStyle.runProps);

    				for (const baseValues of baseStyle.styles) {
    					const styleValues = style.styles.find(x => x.target == baseValues.target);

    					if (styleValues) {
    						this.copyStyleProperties(baseValues.values, styleValues.values);
    					} else {
    						style.styles.push({ ...baseValues, values: { ...baseValues.values } });
    					}
    				}
    			} else if (this.options.debug) {
                    console.warn(`Can't find base style ${style.basedOn}`);
                }
    		}

    		for (let style of styles) {
    			style.cssName = this.processStyleName(style.id);
    		}

    		return stylesMap;
    	}
    }

    // 编号
    class RenderNumbering extends BasePart {
        constructor(numberingPart) {
    		super();
    		this.numberingPart = numberingPart;
        }

        render(styleContainer) {
            this.prodessNumberings(this.numberingPart.props);
            appendComment(styleContainer, "docxjs document numbering styles");
            styleContainer.appendChild(this.renderNumbering(this.numberingPart.props, styleContainer));
            //styleContainer.appendChild(this.renderNumbering2(document.numberingPart, styleContainer));
        }

        // renderNumbering2(numberingPart: NumberingPartProperties, container: HTMLElement): HTMLElement {
    	//     let css = "";
    	//     const numberingMap = keyBy(numberingPart.abstractNumberings, x => x.id);
    	//     const bulletMap = keyBy(numberingPart.bulletPictures, x => x.id);
    	//     const topCounters = [];

    	//     for(let num of numberingPart.numberings) {
    	//         const absNum = numberingMap[num.abstractId];

    	//         for(let lvl of absNum.levels) {
    	//             const className = this.numberingClass(num.id, lvl.level);
    	//             let listStyleType = "none";

    	//             if(lvl.text && lvl.format == 'decimal') {
    	//                 const counter = this.numberingCounter(num.id, lvl.level);

    	//                 if (lvl.level > 0) {
    	//                     css += this.styleToString(`p.${this.numberingClass(num.id, lvl.level - 1)}`, {
    	//                         "counter-reset": counter
    	//                     });
    	//                 } else {
    	//                     topCounters.push(counter);
    	//                 }

    	//                 css += this.styleToString(`p.${className}:before`, {
    	//                     "content": this.levelTextToContent(lvl.text, num.id),
    	//                     "counter-increment": counter
    	//                 });
    	//             } else if(lvl.bulletPictureId) {
    	//                 let pict = bulletMap[lvl.bulletPictureId];
    	//                 let variable = `--${this.className}-${pict.referenceId}`.toLowerCase();

    	//                 css += this.styleToString(`p.${className}:before`, {
    	//                     "content": "' '",
    	//                     "display": "inline-block",
    	//                     "background": `var(${variable})`
    	//                 }, pict.style);

    	//                 this.document.loadNumberingImage(pict.referenceId).then(data => {
    	//                     var text = `.${this.className}-wrapper { ${variable}: url(${data}) }`;
    	//                     container.appendChild(createStyleElement(text));
    	//                 });
    	//             } else {
    	//                 listStyleType = this.numFormatToCssValue(lvl.format);
    	//             }

    	//             css += this.styleToString(`p.${className}`, {
    	//                 "display": "list-item",
    	//                 "list-style-position": "inside",
    	//                 "list-style-type": listStyleType,
    	//                 //TODO
    	//                 //...num.style
    	//             });
    	//         }
    	//     }

    	//     if (topCounters.length > 0) {
    	//         css += this.styleToString(`.${this.className}-wrapper`, {
    	//             "counter-reset": topCounters.join(" ")
    	//         });
    	//     }

    	//     return createStyleElement(css);
    	// }

    	renderNumbering(styleContainer) {
    		var styleText = "";
    		var rootCounters = [];

    		for (var num of this.numberings) {
    			var selector = `p.${this.numberingClass(num.id, num.level)}`;
    			var listStyleType = "none";

    			if (num.bullet) {
    				let valiable = `--${this.className}-${num.bullet.src}`.toLowerCase();

    				styleText += this.styleToString(`${selector}:before`, {
    					"content": "' '",
    					"display": "inline-block",
    					"background": `var(${valiable})`
    				}, num.bullet.style);

    				this.document.loadNumberingImage(num.bullet.src).then(data => {
    					var text = `.${this.className}-wrapper { ${valiable}: url(${data}) }`;
    					styleContainer.appendChild(createStyleElement(text));
    				});
    			} else if (num.levelText) {
    				let counter = this.numberingCounter(num.id, num.level);

    				if (num.level > 0) {
    					styleText += this.styleToString(`p.${this.numberingClass(num.id, num.level - 1)}`, {
    						"counter-reset": counter
    					});
    				} else {
    					rootCounters.push(counter);
    				}

    				styleText += this.styleToString(`${selector}:before`, {
    					"content": this.levelTextToContent(num.levelText, num.suff, num.id, this.numFormatToCssValue(num.format)),
    					"counter-increment": counter,
    					...num.rStyle,
    				});
    			} else {
    				listStyleType = this.numFormatToCssValue(num.format);
    			}

    			styleText += this.styleToString(selector, {
    				"display": "list-item",
    				"list-style-position": "inside",
    				"list-style-type": listStyleType,
    				...num.pStyle
    			});
    		}

    		if (rootCounters.length > 0) {
    			styleText += this.styleToString(`.${this.className}-wrapper`, {
    				"counter-reset": rootCounters.join(" ")
    			});
    		}

    		return createStyleElement(styleText);
    	}

        levelTextToContent(text, suff, id, numformat) {
    		const suffMap = {
    			"tab": "\\9",
    			"space": "\\a0",
    		};

    		var result = text.replace(/%\d*/g, s => {
    			let lvl = parseInt(s.substring(1), 10) - 1;
    			return `"counter(${this.numberingCounter(id, lvl)}, ${numformat})"`;
    		});

    		return `"${result}${suffMap[suff] || ""}"`;
    	}

    	prodessNumberings(numberings) {
    		for (let num of numberings.filter(n => n.pStyleName)) {
    			const style = this.findStyle(num.pStyleName);

    			if (style.paragraphProps && style.paragraphProps.numbering) {
    				style.paragraphProps.numbering.level = num.level;
    			}
    		}
    	}
    }

    // 导入字体文件
    class RenderFontTable extends BasePart {
        constructor(fontsPart) {
    		super();
    		this.fontsPart = fontsPart;
        }

        render(styleContainer) {
    		for (let f of this.fontsPart.props) {
    			// 
    			for (let ref of f.embedFontRefs) {
    				this.document.loadFont(ref.id, ref.key).then(fontData => {
    					const cssValues = {
    						'font-family': f.name,
    						'src': `url(${fontData})`
    					};

    					if (ref.type == "bold" || ref.type == "boldItalic") {
    						cssValues['font-weight'] = 'bold';
    					}

    					if (ref.type == "italic" || ref.type == "boldItalic") {
    						cssValues['font-style'] = 'italic';
    					}

    					appendComment(styleContainer, `docxjs ${f.name} font`);
    					const cssText = this.styleToString("@font-face", cssValues);
    					styleContainer.appendChild(createStyleElement(cssText));
    					// this.refreshTabStops();
    				});
    			}
    		}
    	}
    }

    const DomType = {
        Document: "document",
        Paragraph: "paragraph",
        Run: "run",
        Break: "break",
        NoBreakHyphen: "noBreakHyphen",
        Table: "table",
        Row: "row",
        Cell: "cell",
        Hyperlink: "hyperlink",
        Drawing: "drawing",
        Image: "image",
        Text: "text",
        Tab: "tab",
        Symbol: "symbol",
        BookmarkStart: "bookmarkStart",
        BookmarkEnd: "bookmarkEnd",
        Footer: "footer",
        Header: "header",
        FootnoteReference: "footnoteReference", 
    	EndnoteReference: "endnoteReference",
        Footnote: "footnote",
        Endnote: "endnote",
        SimpleField: "simpleField",
        ComplexField: "complexField",
        Instruction: "instruction",
    	VmlPicture: "vmlPicture",
    	VmlShape: "vmlShape"
    };

    class RenderBody extends BasePart  {
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
    			className: "docx",
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
    			...options
    		}; 

    		this.className = this.options.className || 'docx';

    		this.styleMap = styleMap;
    		this.footnoteMap = footnoteMap;
    		this.endnoteMap = endnoteMap;
    		this.defaultTabSize = defaultTabSize;

    		this.htmlDocument = htmlDocument;
        }

        render() {
    		const result = [];
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
    				prevProps != props, 
    				sectionElement
    			);

    			var contentElement = this.createElement("article");
    			// 渲染当前页
    			this.renderElements(section.elements, contentElement);
    			sectionElement.appendChild(contentElement);

    			if (this.options.renderFootnotes) {
    				this.renderNotes(this.currentFootnoteIds, this.footnoteMap, sectionElement);
    			}

    			if (this.options.renderEndnotes && i == l - 1) {
    				this.renderNotes(this.currentEndnoteIds, this.endnoteMap, sectionElement);
    			}

    			this.options.renderFooters && this.renderHeaderFooter(props.footerRefs, props,
    				result.length, prevProps != props, sectionElement);

    			result.push(sectionElement);
    			prevProps = props;
    		}

    		return result;
    	}

        renderStyleValues(style, ouput) {
    		Object.assign(ouput.style, style);
    	}

    	renderElements(elems, into) {
    		if (elems == null)
    			return null;

    		var result = elems.map(e => this.renderElement(e)).filter(e => e != null);

    		if (into)
    			appendChildren(into, result);

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
    				return null; //ignore bookmark end
    			// run标签
    			case DomType.Run:
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
    				return this.renderContainer(elem, "footer");

    			case DomType.Header:
    				return this.renderContainer(elem, "header");
    			// 脚注 尾注
    			case DomType.Footnote:
    			case DomType.Endnote:
    				return this.renderContainer(elem, "li");

    			case DomType.FootnoteReference:
    				return this.renderFootnoteReference(elem);

    			case DomType.EndnoteReference:
    				return this.renderEndnoteReference(elem);

    			case DomType.NoBreakHyphen:
    				return this.createElement("wbr");

    			case DomType.VmlPicture:
    				return this.renderVmlPicture(elem);

    			case DomType.VmlShape:
    				return this.renderVmlShape(elem);
    		}

    		return null;
    	}

        renderHeaderFooter(refs, props, page, firstOfSection, into) {
    		if (!refs) return;

    		var ref = (props.titlePage && firstOfSection ? refs.find(x => x.type == "first") : null)
    			|| (page % 2 == 1 ? refs.find(x => x.type == "even") : null)
    			|| refs.find(x => x.type == "default");

    		var part = ref && this.document.findPartByRelId(ref.id, this.document.documentPart);

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
    		var notes = noteIds.map(id => notesMap[id]).filter(x => x);

    		if (notes.length > 0) {
    			var result = this.createElement("ol", null, this.renderElements(notes));
    			into.appendChild(result);
    		}
    	}

        renderParagraph(elem) {
    		var result = this.createElement("p");

    		const style = this.findStyle(elem.styleName);
    		elem.tabs = style && style.paragraphProps && style.paragraphProps.tabs ? style.paragraphProps.tabs : null;  //TODO

    		this.renderClass(elem, result);
    		this.renderChildren(elem, result);
    		this.renderStyleValues(elem.cssStyle, result);
    		this.renderCommonProperties(result.style, elem);

    		const numbering = elem.numbering || (style && style.paragraphProps && style.paragraphProps.numbering ? style.paragraphProps.numbering : null);

    		if (numbering) {
    			result.classList.add(this.numberingClass(numbering.id, numbering.level));
    		}

    		return result;
    	}

        renderClass(input, ouput) {
    		if (input.className)
    			ouput.className = input.className;

    		if (input.styleName)
    			ouput.classList.add(this.processStyleName(input.styleName));
    	}

        renderChildren(elem, into) {
    		return this.renderElements(elem.children, into);
    	}

        renderStyleValues(style, ouput) {
    		Object.assign(ouput.style, style);
    	}

        renderCommonProperties(style, props) {
    		if (props == null)
    			return;

    		if (props.color) {
    			style["color"] = props.color;
    		}

    		if (props.fontSize) {
    			style["font-size"] = props.fontSize;
    		}
    	}

        renderBookmarkStart(elem) {
    		var result = this.createElement("span");
    		result.id = elem.name;
    		return result;
    	}

        renderRun(elem) {
    		if (elem.fieldRun)
    			return null;

    		const result = this.createElement("span");

    		if (elem.id)
    			result.id = elem.id;

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
    		let result = this.createElement("table");

    		this.tableCellPositions.push(this.currentCellPosition);
    		this.tableVerticalMerges.push(this.currentVerticalMerge);
    		this.currentVerticalMerge = {};
    		this.currentCellPosition = { col: 0, row: 0 };

    		if (elem.columns)
    			result.appendChild(this.renderTableColumns(elem.columns));

    		this.renderClass(elem, result);
    		this.renderChildren(elem, result);
    		this.renderStyleValues(elem.cssStyle, result);

    		this.currentVerticalMerge = this.tableVerticalMerges.pop();
    		this.currentCellPosition = this.tableCellPositions.pop();

    		return result;
    	}

        renderTableColumns(columns) {
    		let result = this.createElement("colgroup");

    		for (let col of columns) {
    			let colElem = this.createElement("col");

    			if (col.width)
    				colElem.style.width = col.width;

    			result.appendChild(colElem);
    		}

    		return result;
    	}

    	renderTableRow(elem) {
    		let result = this.createElement("tr");

    		this.currentCellPosition.col = 0;

    		this.renderClass(elem, result);
    		this.renderChildren(elem, result);
    		this.renderStyleValues(elem.cssStyle, result);

    		this.currentCellPosition.row++;

    		return result;
    	}

    	renderTableCell(elem) {
    		let result = this.createElement("td");

    		if (elem.verticalMerge) {
    			const key = this.currentCellPosition.col;

    			if (elem.verticalMerge == "restart") {
    				this.currentVerticalMerge[key] = result;
    				result.rowSpan = 1;
    			} else if (this.currentVerticalMerge[key]) {
    				this.currentVerticalMerge[key].rowSpan += 1;
    				result.style.display = "none";
    			}
    		}

    		this.renderClass(elem, result);
    		this.renderChildren(elem, result);
    		this.renderStyleValues(elem.cssStyle, result);

    		if (elem.span)
    			result.colSpan = elem.span;

    		this.currentCellPosition.col++;

    		return result;
    	}

        renderHyperlink(elem) {
    		var result = this.createElement("a");

    		this.renderChildren(elem, result);
    		this.renderStyleValues(elem.cssStyle, result);

    		if (elem.href)
    			result.href = elem.href;

    		return result;
    	}

        renderDrawing(elem) {
    		var result = this.createElement("div");

    		result.style.display = "inline-block";
    		result.style.position = "relative";
    		result.style.textIndent = "0px";

    		this.renderChildren(elem, result);
    		this.renderStyleValues(elem.cssStyle, result);

    		return result;
    	}

    	renderImage(elem) {
    		let result = this.createElement("img");

    		this.renderStyleValues(elem.cssStyle, result);

    		if (this.document) {
    			this.document.loadDocumentImage(elem.src, this.currentPart).then(x => {
    				result.src = x;
    			});
    		}

    		return result;
    	}

    	renderText(elem) {
    		return this.htmlDocument.createTextNode(elem.text);
    	}

    	renderBreak(elem) {
    		if (elem.break == "textWrapping") {
    			return this.createElement("br");
    		}

    		return null;
    	}

    	renderSymbol(elem) {
    		var span = this.createElement("span");
    		span.style.fontFamily = elem.font;
    		span.innerHTML = `&#x${elem.char};`;
    		return span;
    	}

        renderContainer(elem, tagName) {
    		return this.createElement(tagName, null, this.renderChildren(elem));
    	}

        renderVmlPicture(elem) {
    		var result = createSvgElement("svg");
    		this.renderChildren(elem, result);

    		setTimeout(() => {
    			const bb = result.getBBox();

    			result.setAttribute("width", `${Math.round(bb.width)}`);
    			result.setAttribute("height", `${Math.round(bb.height)}`);
    		});

    		return result;
    	}

    	renderVmlShape(elem) {
    		if (elem.imagedata) {
    			const image = createSvgElement("image");

    			image.setAttribute("style", elem.cssStyleText);

    			if (this.document) {
    				this.document.loadDocumentImage(elem.imagedata.id, this.currentPart).then(x => {
    					image.setAttribute("href", x);
    				});
    			}

    			return image;
    		}
    	}

        numberingClass(id, lvl) {
    		return `${this.className}-num-${id}-${lvl}`;
    	}

    	findStyle(styleName) {
    		return styleName && this.styleMap && this.styleMap[styleName];
    	}

    	splitBySection(elements) {
    		var current = { sectProps: null, elements: [] };
    		var result = [current];

    		for (let elem of elements) {
    			if (elem.type == DomType.Paragraph) {
    				const s = this.findStyle((elem).styleName);

    				if (s && s.paragraphProps && s.paragraphProps.pageBreakBefore) {
    					current.sectProps = sectProps;
    					current = { sectProps: null, elements: [] };
    					result.push(current);
    				}
    			}

    			current.elements.push(elem);

    			if (elem.type == DomType.Paragraph) {
    				const p = elem;

    				var sectProps = p.sectionProps;
    				var pBreakIndex = -1;
    				var rBreakIndex = -1;

    				if (this.options.breakPages && p.children) {
    					pBreakIndex = p.children.findIndex(r => {
    						rBreakIndex = (r.children || []).findIndex(this.isPageBreakElement.bind(this)) || -1;
    						return rBreakIndex != -1;
    					});
    				}

    				if (sectProps || pBreakIndex != -1) {
    					current.sectProps = sectProps;
    					current = { sectProps: null, elements: [] };
    					result.push(current);
    				}

    				if (pBreakIndex != -1) {
    					let breakRun = p.children[pBreakIndex];
    					let splitRun = rBreakIndex < breakRun.children.length - 1;

    					if (pBreakIndex < p.children.length - 1 || splitRun) {
    						var children = elem.children;
    						var newParagraph = { ...elem, children: children.slice(pBreakIndex) };
    						elem.children = children.slice(0, pBreakIndex);
    						current.elements.push(newParagraph);

    						if (splitRun) {
    							let runChildren = breakRun.children;
    							let newRun = { ...breakRun, children: runChildren.slice(0, rBreakIndex) };
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

    	processElement(element) {
    		if (element.children) {
    			for (var e of element.children) {
    				e.parent = element;

    				if (e.type == DomType.Table) {
    					this.processTable(e);
    				} else {
    					this.processElement(e);
    				}
    			}
    		}
    	}

        createSection(className, props) {
    		var elem = this.createElement("section", { className });

    		if (props) {
    			if (props.pageMargins) {
    				elem.style.paddingLeft = props.pageMargins.left;
    				elem.style.paddingRight = props.pageMargins.right;
    				elem.style.paddingTop = props.pageMargins.top;
    				elem.style.paddingBottom = props.pageMargins.bottom;
    			}

    			if (props.pageSize) {
    				if (!this.options.ignoreWidth)
    					elem.style.width = props.pageSize.width;
    				if (!this.options.ignoreHeight)
    					elem.style.minHeight = props.pageSize.height;
    			}

    			if (props.columns && props.columns.numberOfColumns) {
    				elem.style.columnCount = `${props.columns.numberOfColumns}`;
    				elem.style.columnGap = props.columns.space;

    				if (props.columns.separator) {
    					elem.style.columnRule = "1px solid black";
    				}
    			}
    		}

    		return elem;
    	}

    	isPageBreakElement(elem) {
    		if (elem.type != DomType.Break)
    			return false;

    		if (elem.break == "lastRenderedPageBreak")
    			return !this.options.ignoreLastRenderedPageBreak;

    		return elem.break == "page";
    	}
    }

    class HtmlRender {
        constructor(htmlDocument) {
            this.htmlDocument = htmlDocument;
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
            let styleMap = null, 
                footnoteMap = null, 
                endnoteMap = null,
                defaultTabSize = [];

            removeAllElements(styleContainer);
            removeAllElements(bodyContainer);
            appendComment(styleContainer, "docxjs library predefined styles");
            styleContainer.appendChild(renderDefaultStyle(className));

            // 渲染主题
            if (document.themePart) {
                new RenderTheme(document.themePart, className).render(styleContainer);
            }

            // 渲染style part
            if (document.stylesPart != null) {
                styleMap = new RenderStyle(document.stylesPart, options).render(styleContainer);
            }

            // 编号
            if (document.numberingPart) {
    			new RenderNumbering(document.numberingPart).render(styleContainer);
    		}

            // 脚注
            if (document.footnotesPart) {
                footnoteMap = keyBy(document.footnotesPart.notes, x => x.id);
            }

            // 尾注
            if (document.endnotesPart) {
                endnoteMap = keyBy(document.endnotesPart.notes, x => x.id);
            }

            // 设置
            if (document.settingsPart) {
                defaultTabSize = document.settingsPart.props && document.settingsPart.props.defaultTabStop ? document.settingsPart.props.defaultTabStop : null;
            }

            // 字体样式合集
            if (!options.ignoreFonts && document.fontTablePart) {
                new RenderFontTable(document.fontTablePart).render(styleContainer);
            }

            const sectionElements = new RenderBody(
                document.documentPart.props, 
                options, 
                styleMap,
                footnoteMap,
                endnoteMap,
                defaultTabSize,
                this.htmlDocument
            ).render();

            if (options.inWrapper) {
                bodyContainer.appendChild(this.renderWrapper(sectionElements));
            } else {
                appendChildren(bodyContainer, sectionElements);
            }

            // this.refreshTabStops();
        }

        renderWrapper(children) {
    		return createElement("div", { className: `${this.className}-wrapper` }, children);
    	}
    }

    return HtmlRender;

}));
