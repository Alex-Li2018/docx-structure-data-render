class RenderBody {
    constructor() {

    }

    renderSections(document) {
		const result = [];

		this.processElement(document);
		const sections = this.splitBySection(document.children);
		let prevProps = null;

		for (let i = 0, l = sections.length; i < l; i++) {
			this.currentFootnoteIds = [];

			const section = sections[i];
			const props = section.sectProps || document.props;
			const sectionElement = this.createSection(this.className, props);
			this.renderStyleValues(document.cssStyle, sectionElement);

			this.options.renderHeaders && this.renderHeaderFooter(props.headerRefs, props,
				result.length, prevProps != props, sectionElement);

			var contentElement = this.createElement("article");
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

    renderStyleValues(style, ouput) {
		Object.assign(ouput.style, style);
	}

    renderHeaderFooter(refs, props, page, firstOfSection, into) {
		if (!refs) return;

		var ref = (props.titlePage && firstOfSection ? refs.find(x => x.type == "first") : null)
			?? (page % 2 == 1 ? refs.find(x => x.type == "even") : null)
			?? refs.find(x => x.type == "default");

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

    renderElements(elems, into) {
		if (elems == null)
			return null;

		var result = elems.map(e => this.renderElement(e)).filter(e => e != null);

		if (into)
			appendChildren(into, result);

		return result;
	}

    renderNotes(noteIds, notesMap, into) {
		var notes = noteIds.map(id => notesMap[id]).filter(x => x);

		if (notes.length > 0) {
			var result = this.createElement("ol", null, this.renderElements(notes));
			into.appendChild(result);
		}
	}

    renderElement(elem) {
		switch (elem.type) {
			case DomType.Paragraph:
				return this.renderParagraph(elem);

			case DomType.BookmarkStart:
				return this.renderBookmarkStart(elem);

			case DomType.BookmarkEnd:
				return null; //ignore bookmark end

			case DomType.Run:
				return this.renderRun(elem);

			case DomType.Table:
				return this.renderTable(elem);

			case DomType.Row:
				return this.renderTableRow(elem);

			case DomType.Cell:
				return this.renderTableCell(elem);

			case DomType.Hyperlink:
				return this.renderHyperlink(elem);

			case DomType.Drawing:
				return this.renderDrawing(elem);

			case DomType.Image:
				return this.renderImage(elem);

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

    renderParagraph(elem) {
		var result = this.createElement("p");

		const style = this.findStyle(elem.styleName);
		elem.tabs ??= style?.paragraphProps?.tabs;  //TODO

		this.renderClass(elem, result);
		this.renderChildren(elem, result);
		this.renderStyleValues(elem.cssStyle, result);
		this.renderCommonProperties(result.style, elem);

		const numbering = elem.numbering ?? style?.paragraphProps?.numbering;

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
		}
		else {
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
			result.href = elem.href

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
		span.innerHTML = `&#x${elem.char};`
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
}

export default RenderBody