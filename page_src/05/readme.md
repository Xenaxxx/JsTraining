* 展示用户输入信息，不要使用 innerHtml，容易被 xss 注入；可以用 innerText
* <a href="javascript:void(0)">click here</a>  保有可点击样式，但点击了什么都不会发生
* button 的禁用，防止多次发出请求
*
