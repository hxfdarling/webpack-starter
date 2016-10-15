import '../assests/css/base.css';
import style from './index.css';
import { data } from './data.json';
import { routes } from "./router.config.js";
if (process.env.ENV === 'dev') {
    window.Vue = Vue;
    window.VueRouter = VueRouter;
}
Vue.config.debug = true;

const router = new VueRouter({
    routes
});
router.beforeEach(function(to, from, next) {
    console.log(from);
    next();
});
let app = new Vue({
    router,
    data: function() {
        return {
            transitionName:"fade",
            routes
        };
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
             
        }
    },
    template: `
		<div>
            <h1>Hello App!</h1>
            <ul>
                <li v-for="item in routes" v-if="item.text"><router-link :to="item.path">{{item.text}}</router-link></li>
            </ul>
           <transition :name="transitionName">
            <router-view></router-view>
            </transition>
        </div>
    `
}).$mount('#app');