import '../assests/css/base.css';
import style from './index.css';
import { data } from './data.json';
document.body.innerHTML = `
    <div class="${style.root}">Hello word</div>
`;
console.log(process.env.ENV);
console.log('start');