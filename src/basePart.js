import {
	escapeClassName
} from './utils'

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
				currentSectProps = result[i].sectProps
			}
		}

		return result;
	}

    render() {
        
    }
}

export default BasePart