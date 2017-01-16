import './assests/css/base.css'
import './app/index.js';
async function test(params) {
	var test = await new Promise(function(resolve) {
		resolve('tset');
	});
}
test().then(i => {
	console.log(i);
})