import './index.css';
import { routes } from "./router.config.js";

if (process.env.ENV === 'dev') {
	window.Vue = Vue;
	window.VueRouter = VueRouter;
	Vue.config.debug = true;
}

var InputComponent = {
	template: `
	<label>
	{{label}}:<input v-model="value" v-on:input="updateValue"/>
	</label>
	`,
	data: function() {
		return {
			value:this.input
		}
	},
	props: ['input', 'label'],
	computed:{
		normalizedInput:function(){
			console.log(test)
			return 'test';
		}
	},
	methods: {
		updateValue: function() {
			this.$emit('input', this.value);
		}
	}
};
const router = new VueRouter({
	routes
});
router.beforeEach(function(to, from, next) {
	next();
});
let app = new Vue({
	router,
	data: function() {
		return {
			cls: "test",
			value: "test",
			transitionName: "fade",
			routes
		};
	},
	components: { "input-x": InputComponent },
	methods: {
		change: function(event) {
			if (this.changeTime) {
				clearTimeout(this.changeTime);
			}
			this.changeTime = setTimeout(function() {
				delete this.changeTime;
				console.log(this.value);
			}.bind(this), 500);
		},
		inputXChange: function(value) {
			this.value = value;
		}
	},
	watch: {
		'$route' (to, from) {
			const toDepth = to.path.split('/').length;
			const fromDepth = from.path.split('/').length;
		}
	},
	template: `
	<div>
		<div class="x-menu">
			<h1>Hello App!</h1>
			<input-x v-on:input="inputXChange" v-bind:input="value" label="my input"></input-x>
			<input v-model="value"/>
			<span>{{value}}</span>
			<ul>
				<li v-for="item in routes" v-if="item.text"><router-link :to="item.path">{{item.text}}</router-link></li>
			</ul>
		</div>
		<div class="x-main">
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
		</div>
	</div>
    `
}).$mount('#app');