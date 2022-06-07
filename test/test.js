import backJSON from './back'
import HtmlRenderer from '../src'

function arrayToObject(data) {
    const obj = {}

    for(let key of data) {
        obj[key.type] = key
    }

    return obj
}

// 测试
new HtmlRenderer(window.document)
.render(arrayToObject(backJSON.data), document.getElementById('docx'), null, { className: 'docx' })