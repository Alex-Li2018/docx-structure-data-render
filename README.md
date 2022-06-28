# docx-structure-data-render

一种渲染固定结构的word数据的渲染引擎。

## options

| Parameter | Type | Default | Description |
| --------- | ---- | ----------- | ----------- |
| breakPages | Boolen | true | 是否分页 |
| className | String | '' | 容器的类名 |
| ignoreFonts | Boolen | false | 忽略字体文件 |
| ignoreHeight | Boolen | false | 忽略高度 |
| ignoreWidth | Boolen | false | 忽略宽度 |
| ignoreLastRenderedPageBreak | Boolen | false | 忽略分页符 |
| inWrapper | Boolen | true |  |
| renderEndnotes | Boolen | true | 渲染尾注 |
| renderFooters | Boolen | true | 渲染页脚 |
| renderFootnotes | Boolen | true | 渲染脚注 |
| renderHeaders | Boolen | true | 渲染页眉 |
| trimXmlDeclaration | Boolen | true | 解析XML去掉声明文件 |
| useBase64URL | Boolen | true | 使用base64 |

## word document data

```js
 "word_document": [
    {
    // word内容
    "type": "documentPart",
        "props": {},
        // 解析的是那个xml
        "path": "word/document.xml" 
    },
    {   
        // word扩展属性
        "type": "extendedPropsPart",
        "props": {},
        "path": "docProps/app.xml"
    },
    {
        // word核心属性
        "type": "corePropsPart",
        "props": {},
        "path": "docProps/core.xml"
    },
    {
        // 页眉
        "type": "footnotesPart",
        "props": {},
        "path": ""
    },
    {
        // 页脚
        "type": "endnotesPart",
        "props": {},
        "path": ""
    },
    {
        // 主题
        "type": "themePart",
        "props": {},
        "path": ""
    },
]
```

## [渲染流程](./docs/%E6%B8%B2%E6%9F%93%E6%B5%81%E7%A8%8B.md)