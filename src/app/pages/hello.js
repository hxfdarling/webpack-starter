import data from '../components/data.js';
console.log(data);
export default  {
    template: `
 
    <div style="background:#ddd;">hello:{{message}}</div>

    `,
    data:data.data
};