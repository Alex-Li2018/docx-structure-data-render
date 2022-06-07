export default {
    "code": 200,
    "data": [
        {
            "type": "documentPart",
            "props": {
                "type": "document",
                "children": [
                    // {
                    //     "type": "paragraph",
                    //     "children": [
                    //         {
                    //             "type": "run",
                    //             "parent": null,
                    //             "children": [
                    //                 {
                    //                     "type": "text",
                    //                     "text": "这是一个用来测试",
                    //                     "id": 11
                    //                 }
                    //             ],
                    //             "cssStyle": {},
                    //             "id": 4,
                    //             "parent_id": 2
                    //         },
                    //         {
                    //             "type": "run",
                    //             "parent": null,
                    //             "children": [
                    //                 {
                    //                     "type": "text",
                    //                     "text": "nodejs",
                    //                     "id": 12
                    //                 }
                    //             ],
                    //             "cssStyle": {},
                    //             "id": 5,
                    //             "parent_id": 2
                    //         },
                    //         {
                    //             "type": "run",
                    //             "parent": null,
                    //             "children": [
                    //                 {
                    //                     "type": "text",
                    //                     "text": "解析",
                    //                     "id": 13
                    //                 }
                    //             ],
                    //             "cssStyle": {},
                    //             "id": 6,
                    //             "parent_id": 2
                    //         },
                    //         {
                    //             "type": "run",
                    //             "parent": null,
                    //             "children": [
                    //                 {
                    //                     "type": "text",
                    //                     "text": "Word",
                    //                     "id": 14
                    //                 }
                    //             ],
                    //             "cssStyle": {},
                    //             "id": 7,
                    //             "parent_id": 2
                    //         },
                    //         {
                    //             "type": "run",
                    //             "parent": null,
                    //             "children": [
                    //                 {
                    //                     "type": "text",
                    //                     "text": "文档",
                    //                     "id": 15
                    //                 }
                    //             ],
                    //             "cssStyle": {},
                    //             "id": 8,
                    //             "parent_id": 2
                    //         },
                    //         {
                    //             "type": "run",
                    //             "parent": null,
                    //             "children": [
                    //                 {
                    //                     "type": "text",
                    //                     "text": ".doccccc",
                    //                     "id": 16
                    //                 }
                    //             ],
                    //             "cssStyle": {},
                    //             "id": 9,
                    //             "parent_id": 2
                    //         }
                    //     ],
                    //     "cssStyle": {},
                    //     "runProps": {},
                    //     "paragraph_text": "这是一个用来测试nodejs解析Word文档.doccccc",
                    //     "id": 2
                    // },
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
}