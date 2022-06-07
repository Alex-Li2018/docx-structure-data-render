// rollup.config.js
import { terser } from "rollup-plugin-terser";

let file = './dist/renderWordDocumentJSON.js'
let plugins = []

if (process.env.NODE_ENV === 'production') {
    plugins.push(terser())
    file = './dist/renderWordDocumentJSON.min.js'
} 

export default {
    // 核心选项
    input: process.env.NODE_ENV === 'test' ? './src/index.js' : './test/test.js',     // 必须
    output: {
        file,
        format: 'umd',
        name: 'renderWordDocumentJSON',
    },
    plugins
};