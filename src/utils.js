// 创建元素
export function createElement(tagName, props, children) {
    return createElementNS(undefined, tagName, props, children);
}

export function createSvgElement(tagName, props, children) {
    return createElementNS("http://www.w3.org/2000/svg", tagName, props, children);
}

export function createElementNS(ns, tagName, props, children) {
    var result = ns ? document.createElementNS(ns, tagName) : document.createElement(tagName);
    Object.assign(result, props);
    children && appendChildren(result, children);
    return result;
}

export function removeAllElements(elem) {
    elem.innerHTML = '';
}

export function appendChildren(elem, children) {
    children.forEach(function (c) { return elem.appendChild(c); });
}

export function createStyleElement(cssText) {
    return createElement("style", { innerHTML: cssText });
}

export function appendComment(elem, comment) {
    elem.appendChild(document.createComment(comment));
}

export function findParent(elem, type) {
    var parent = elem.parent;
    while (parent != null && parent.type != type)
        parent = parent.parent;
    return parent;
}

export function keyBy(array, by) {
    return array.reduce((a, x) => {
            a[by(x)] = x;
            return a;
        }, {}
    );
}

export function escapeClassName(className) {
	return (className || '').replace(/[ .]+/g, '-').replace(/[&]+/g, 'and').toLowerCase();
}

export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
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

export function pt2pt() {
    
}