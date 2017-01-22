 const route = (name) => {
 	return callback => { import (`./route/${name}`).then(route => { callback(route.default || route) }) }
 };

 export const routes = [{
 		"path": "/",
 		"redirect": "/index"
 	},
 	{
 		"path": "/index",
 		"name": "index",
 		"text": "index page",
 		"component": route("index")
 	},
 	{
 		"path": "/hello",
 		"name": "hello",
 		"text": "hello page",
 		"component": route("hello")
 	},
 	{
 		"path": "/list",
 		"name": "list",
 		"text": "list page",
 		"component": route("list")
 	}
 ];