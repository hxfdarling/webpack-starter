import data from '../components/data.js';
import style from './hello.css';
export default  {
    template: `
 
    <div style="${style.text}">hello:{{message}}</div>

    `,
    data:data.data
};