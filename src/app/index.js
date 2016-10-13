import '../assests/css/base.css';
import style from './index.css';
import { data } from './data.json';
import Vue from 'vue';
document.body.innerHTML = `<div class="app" id="app"></div>`;
window.Vue = Vue;
// 定义
var MyComponent = Vue.extend({
    create: function() {
        console.log('create');
    },
    template: '<div>A global component!</div>'
});

// 注册
Vue.component('g-component', MyComponent);
var nav = Vue.extend({
    template: "<span>{{message}}</span>",
    data: function() {
        return {
            message: 'hellow word'
        };
    }
});

new Vue({
    el: "#app",
    template: `<c-component></c-component>`,
    components: {
        // <my-component> 只能用在父组件模板内
        'c-component': nav
    }
});
console.log(process.env.ENV);
console.log('start');