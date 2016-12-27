import data from '../components/data.js'
import './hello.css'
import xButton from '../components/x-button.vue'
if (module.hot) {
	module.hot.accept();
}
console.log('sadf');
export default {
	components: { xButton },
	template: `
	<div>
		<x-button></x-button>
		<div>hello:{{message}}</div>
	</div>
	`,
	data: data.data
};