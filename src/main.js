/* 
    普通打包 webpack src/main.js -o dist/banger.js
*/

// 使用commonjs的模块化规范
const {some,sune} = require('./js/one.js')

console.log(some(20,30));
console.log(sune(20,30));


// 使用Es6的模块化规范
import {name,age,hder} from './js/two.js';
console.log(name);
console.log(age);
console.log(hder);

// Es6方法三
import tdata from './js/tree.js';
console.log(tdata);

// 引入css文件
require('./css/domer.less');

// 导入Vue的包
import Vue from 'vue';
import App from './vue/App.vue'

new Vue({
    el: '#app',
    template: `<App></App>`,
    data: {},
    components: {
        App:App
    }
    
})