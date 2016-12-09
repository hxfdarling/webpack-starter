import data from '../components/data.js';
import './list.css';
export default {
	template: `
	<ul>
		<li v-for="item in list">
			<div class="item">list:<span>{{item}}</span></div>
		</li>
	</ul>
    `,
	data: function() {
		return {
			data,
			list: [
				'1.test', '2.go'
			]
		}
	}
}