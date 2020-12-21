/**
 * @author 傅小凌 279811056#qq.com 
 * 
 * 指令：代码高亮
 * 基于highLight.js实现
 * 
 */
import Hljs from 'highlight.js'
import 'highlight.js/styles/hopscotch.css' // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件
let cacheId = ''
const init = (el, id) => {
  if (id === cacheId) {
    return false
  } else {
    let blocks = el.querySelectorAll('pre code')
    for (let i = 0; i < blocks.length; i++) {
      Hljs.highlightBlock(blocks[i])
      const block = blocks[i]
      let lines = block.innerHTML.replace(/(\r\n|\n|\r)/gm, "<br><br>").split("<br><br>")
      let html = ''
      for (let i = 0; i < lines.length; i++) {
        html += `<span class="code-line-number">${i+1}</span>${lines[i]}<br>`
      }
      block.innerHTML = html
    }
    cacheId = id
  }
}
export default {
  bind () {},
  inserted (el, binding) {
    init(el, binding.value)
  },
  update () {},
  componentUpdated (el, binding) {
    init(el, binding.value)
  },
  unbind() {}
}