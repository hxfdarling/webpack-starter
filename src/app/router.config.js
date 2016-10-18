import * as componentes from "./routes.js";
export const routes = [{
        "path": "/",
        "redirect": "/index"
    },
    {
        "path": "/index",
        "name": "index",
        "text": "index page",
        "component": componentes.index
    },
    {
        "path": "/hello",
        "name": "hello",
        "text": "hello page",
        "component": componentes.hello
    },
    {
        "path": "/list",
        "name": "list",
        "text": "list page",
        "component": componentes.list
    }
];