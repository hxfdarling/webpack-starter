// import Vuex from "vuex"
// import Vue from 'vue'
// Vue.use(Vuex)
const route = (name) => {
  return callback => { import(`./route/${name}`).then(route => { callback(route.default || route) }) }
};
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
})
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
