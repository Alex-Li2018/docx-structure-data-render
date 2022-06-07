import BasePart from "../basePart";
import {
    createStyleElement,
    appendComment,
} from '../utils'

// 编号
class RenderNumbering extends BasePart {
    constructor(numberingPart) {
		super()
		this.numberingPart = numberingPart
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

export default RenderNumbering