import BasePart from "../basePart";
import {
    createStyleElement,
    appendComment,
    keyBy,
	mergeDeep,
} from '../utils'

// 样式
class RenderStyle extends BasePart {
    constructor(stylesPart, options) {
		super()
		this.stylesPart = stylesPart
		this.styleMap = null
		this.options = {
			debug: false,
			...options
		}
		this.className = options.className
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

export default RenderStyle