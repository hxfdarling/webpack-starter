import '../assests/css/base.css';
import style from './index.css';
import { data } from './data.json';
import html from './index.html';
document.body.innerHTML = html;
window.Vue = Vue;
// 定义
var MyComponent = Vue.extend({
    created: function() {
        // `this` 指向 vm 实例
        console.log('created', this);
    },
    beforeCompile: function() {
        console.log('this);')
    },
    compiled: function() {
        console.log('test');
    },
    ready: function() {
        console.log('ready');
    },
    beforeDestroy: function() {

    },
    destroyed: function() {

    },
    data: function() {
        return {
            items: [
                '1', '2', '3', '4', '5', '6'
            ]
        }
    },
    template: `
    <div class="${style.root}">A global component!
        <div v-for='item in items' class="${style.ok}" >{{item}}</div>
    </div>   
    `
});
// 注册
Vue.component('g-component', MyComponent);
var nav = Vue.extend({
    template: `<div class="${style.root}">{{message}}</div>`,
    data: function() {
        return {
            message: 'hellow word'
        };
    }
});

new Vue({
    el: "#app",
    template: `<div><g-component></g-component><c-component></c-component></div>`,
    components: {
        // <my-component> 只能用在父组件模板内
        'c-component': nav
    }
});