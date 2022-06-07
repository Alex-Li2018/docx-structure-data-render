(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

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

    function createStyleElement$1(cssText) {
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
    	return className?.replace(/[ .]+/g, '-').replace(/[&]+/g, 'and').toLowerCase();
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
                    const val = target[key] ?? (target[key] = {});
                    mergeDeep(val, source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }

        return mergeDeep(target, ...sources);
    }

    function renderDefaultStyle() {
        const c = this.className;
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

        splitBySection(elements) {
    		var current = { sectProps: null, elements: [] };
    		var result = [current];

    		for (let elem of elements) {
    			if (elem.type == DomType.Paragraph) {
    				const s = this.findStyle((elem).styleName);

    				if (s?.paragraphProps?.pageBreakBefore) {
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
    						rBreakIndex = r.children?.findIndex(this.isPageBreakElement.bind(this)) ?? -1;
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

        render() {
            
        }
    }

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
    		styleContainer.appendChild(createStyleElement$1(cssText));
        }
    }

    class RenderStyle extends BasePart {
        constructor(stylesPart, options) {
    		super();
    		this.stylesPart = stylesPart;
    		this.styleMap = null;
    		this.options = options;
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
    				const linkedStyle = style.linked && this.stylesMap[style.linked];

    				if (linkedStyle)
    					subStyles = subStyles.concat(linkedStyle.styles);
    				else if (this.options.debug)
    					console.warn(`Can't find linked style ${style.linked}`);
    			}

    			for (const subStyle of subStyles) {
    				//TODO temporary disable modificators until test it well
    				let selector = `${style.target ?? ''}.${style.cssName}`; //${subStyle.mod ?? ''} 

    				if (style.target != subStyle.target)
    					selector += ` ${subStyle.target}`;

    				if (defautStyles[style.target] == style)
    					selector = `.${this.className} ${style.target}, ` + selector;

    				styleText += this.styleToString(selector, subStyle.values);
    			}
    		}

    		return createStyleElement$1(styleText);
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
    			}
    			else if (this.options.debug) {
                    console.warn(`Can't find base style ${style.basedOn}`);
                }
    		}

    		for (let style of styles) {
    			style.cssName = this.processStyleName(style.id);
    		}

    		return stylesMap;
    	}
    }

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
    					styleContainer.appendChild(createStyleElement$1(text));
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

    		return createStyleElement$1(styleText);
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

    		return `"${result}${suffMap[suff] ?? ""}"`;
    	}

    	prodessNumberings(numberings) {
    		for (let num of numberings.filter(n => n.pStyleName)) {
    			const style = this.findStyle(num.pStyleName);

    			if (style?.paragraphProps?.numbering) {
    				style.paragraphProps.numbering.level = num.level;
    			}
    		}
    	}
    }

    // 字体文件
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
    					styleContainer.appendChild(createStyleElement$1(cssText));
    					// this.refreshTabStops();
    				});
    			}
    		}
    	}
    }

    var backJSON = {
        "code": 200,
        "data": [
            {
                "type": "documentPart",
                "body": {
                    "type": "document",
                    "children": [
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": "这是一个用来测试",
                                            "id": 11
                                        }
                                    ],
                                    "cssStyle": {},
                                    "id": 4,
                                    "parent_id": 2
                                },
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": "nodejs",
                                            "id": 12
                                        }
                                    ],
                                    "cssStyle": {},
                                    "id": 5,
                                    "parent_id": 2
                                },
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": "解析",
                                            "id": 13
                                        }
                                    ],
                                    "cssStyle": {},
                                    "id": 6,
                                    "parent_id": 2
                                },
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": "Word",
                                            "id": 14
                                        }
                                    ],
                                    "cssStyle": {},
                                    "id": 7,
                                    "parent_id": 2
                                },
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": "文档",
                                            "id": 15
                                        }
                                    ],
                                    "cssStyle": {},
                                    "id": 8,
                                    "parent_id": 2
                                },
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": ".doccccc",
                                            "id": 16
                                        }
                                    ],
                                    "cssStyle": {},
                                    "id": 9,
                                    "parent_id": 2
                                }
                            ],
                            "cssStyle": {},
                            "runProps": {},
                            "paragraph_text": "这是一个用来测试nodejs解析Word文档.doccccc",
                            "id": 2
                        },
                        {
                            "type": "paragraph",
                            "children": [
                                {
                                    "type": "run",
                                    "parent": null,
                                    "children": [
                                        {
                                            "type": "text",
                                            "text": "This is a test for parsing the Word file in node.",
                                            "id": 17
                                        }
                                    ],
                                    "id": 10,
                                    "parent_id": 3
                                }
                            ],
                            "cssStyle": {},
                            "runProps": {},
                            "paragraph_text": "This is a test for parsing the Word file in node.",
                            "id": 3
                        }
                    ],
                    "props": {
                        "pageSize": {
                            "width": "595.30pt",
                            "height": "841.90pt",
                            "orientation": ""
                        },
                        "pageMargins": {
                            "left": "90.00pt",
                            "right": "90.00pt",
                            "top": "72.00pt",
                            "bottom": "72.00pt",
                            "header": "42.55pt",
                            "footer": "49.60pt",
                            "gutter": "0.00pt"
                        },
                        "columns": {
                            "numberOfColumns": null,
                            "space": "36.00pt",
                            "separator": null,
                            "equalWidth": true,
                            "columns": []
                        }
                    },
                    "cssStyle": {},
                    "id": 1
                },
                "path": "word/document.xml"
            },
            {
                "type": "extendedPropsPart",
                "props": {
                    "template": "Normal.dotm",
                    "pages": 1,
                    "words": 12,
                    "characters": 69,
                    "application": "Microsoft Office Word",
                    "lines": 1,
                    "paragraphs": 1,
                    "company": "",
                    "appVersion": "16.0000"
                },
                "path": "docProps/app.xml"
            },
            {
                "type": "settingsPart",
                "props": {
                    "defaultTabStop": "21.00pt"
                },
                "path": "word/settings.xml"
            },
            {
                "type": "stylesPart",
                "props": [
                    {
                        "id": null,
                        "name": null,
                        "target": null,
                        "basedOn": null,
                        "styles": [
                            {
                                "target": "span",
                                "values": {
                                    "font-family": "Calibri"
                                }
                            }
                        ]
                    },
                    {
                        "id": "Normal",
                        "isDefault": true,
                        "name": "Normal",
                        "target": "p",
                        "basedOn": null,
                        "styles": [
                            {
                                "target": "p",
                                "values": {
                                    "text-align": "justify"
                                }
                            },
                            {
                                "target": "span",
                                "values": {
                                    "min-height": "10.50pt",
                                    "font-size": "10.50pt"
                                }
                            }
                        ],
                        "linked": null,
                        "paragraphProps": {},
                        "runProps": {
                            "fontSize": "10.50pt"
                        }
                    },
                    {
                        "id": "DefaultParagraphFont",
                        "isDefault": true,
                        "name": "Default Paragraph Font",
                        "target": "span",
                        "basedOn": null,
                        "styles": [],
                        "linked": null
                    },
                    {
                        "id": "TableNormal",
                        "isDefault": true,
                        "name": "Normal Table",
                        "target": "table",
                        "basedOn": null,
                        "styles": [
                            {
                                "target": "td",
                                "values": {
                                    "padding-top": "0.00pt",
                                    "padding-left": "5.40pt",
                                    "padding-bottom": "0.00pt",
                                    "padding-right": "5.40pt"
                                }
                            }
                        ],
                        "linked": null
                    },
                    {
                        "id": "NoList",
                        "isDefault": true,
                        "name": "No List",
                        "target": null,
                        "basedOn": null,
                        "styles": [],
                        "linked": null
                    }
                ],
                "path": "word/styles.xml"
            },
            {
                "type": "themePart",
                "props": {
                    "colorScheme": {
                        "name": "Office",
                        "colors": {
                            "dk1": "000000",
                            "lt1": "FFFFFF",
                            "dk2": "44546A",
                            "lt2": "E7E6E6",
                            "accent1": "4472C4",
                            "accent2": "ED7D31",
                            "accent3": "A5A5A5",
                            "accent4": "FFC000",
                            "accent5": "5B9BD5",
                            "accent6": "70AD47",
                            "hlink": "0563C1",
                            "folHlink": "954F72"
                        }
                    },
                    "fontScheme": {
                        "name": "Office",
                        "majorFont": {
                            "latinTypeface": "Calibri Light",
                            "eaTypeface": "",
                            "csTypeface": ""
                        },
                        "minorFont": {
                            "latinTypeface": "Calibri",
                            "eaTypeface": "",
                            "csTypeface": ""
                        }
                    }
                },
                "path": "word/theme/theme1.xml"
            },
            {
                "type": "corePropsPart",
                "props": {
                    "title": "",
                    "description": "",
                    "subject": "",
                    "creator": "pc",
                    "keywords": "",
                    "language": null,
                    "lastModifiedBy": "Stuart Watt",
                    "revision": 2
                },
                "path": "docProps/core.xml"
            },
            {
                "type": "fontTablePart",
                "props": [
                    {
                        "name": "Calibri",
                        "embedFontRefs": [],
                        "family": "swiss"
                    },
                    {
                        "name": "SimSun",
                        "embedFontRefs": [],
                        "altName": "宋体",
                        "family": "auto"
                    },
                    {
                        "name": "Times New Roman",
                        "embedFontRefs": [],
                        "family": "roman"
                    },
                    {
                        "name": "Calibri Light",
                        "embedFontRefs": [],
                        "family": "swiss"
                    }
                ],
                "path": "word/fontTable.xml"
            }
        ],
        "msg": "ok"
    };

    class HtmlRenderer {
        constructor(htmlDocument) {
            this.htmlDocument = htmlDocument;
            this.footnoteMap = {};
            this.endnoteMap = {};
            this.defaultTabSize = [];
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
                new RenderTheme(document.themePart, className).render(styleContainer);
            }

            // 渲染style part
            if (document.stylesPart != null) {
                new RenderStyle(document.stylesPart, options).render(styleContainer);
            }

            // 编号
            if (document.numberingPart) {
    			new RenderNumbering(document.numberingPart).render(styleContainer);
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
        const obj = {};

        for(let key of data) {
            obj[key.type] = key;
        }

        return obj
    }

    // 测试
    new HtmlRenderer(window.htmlDocument)
    .render(arrayToObject(backJSON.data), document.getElementById('docx'), null, { className: 'docx' });

}));
