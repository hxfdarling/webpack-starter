export default Vue.extend({
    template: `
 
    <div style="background:#ddd;">{{message}}</div>

    `,
    data: function() {
        return {
            message: 'hellow word'
        };
    }
});