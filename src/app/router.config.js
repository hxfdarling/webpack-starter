import index from './pages/app.js';
import hello from "./pages/hello.js";
export const routes = [
    {
        path:'/',
        redirect:'/index'
    },
    {
        path: '/index',
        name:"index",
        text:"index page",
        component: index
    },
    {
        path: '/hello',
        name:"hello",
        text:'hello page',
        component: hello
    }
]