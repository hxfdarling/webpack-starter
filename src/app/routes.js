export const index =resolve=>{
    require.ensure([],()=>{
        resolve(require("./pages/app.js").default);
    });
};
export const hello = resolve => {
    // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
    // （代码分块）
    require.ensure([], () => {
        resolve(require('./pages/hello.js').default);
    });
};
export const list = resolve => {
    // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
    // （代码分块）
    require.ensure([], () => {
        resolve(require('./pages/list.vue'));
    });
};