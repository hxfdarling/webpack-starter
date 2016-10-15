import style from './app.css';
export default Vue.extend({
    created: function() {
        // `this` 指向 vm 实例
        console.log('created', 'app page');
    },
    data: function() {
        return {
            show: true,
            items: [
                { text: 'Learn JavaScript' },
                { text: 'Learn Vue' },
                { text: 'Build something awesome' }
            ]
        };
    },
    methods: {
        toggleShow: function() {
            this.show = !this.show;
        }
    },
    template: `
  
        <div class="${style['x-main']}" >
            <div v-if="show">
                <div v-for='item in items' class="test" >{{item.text}}</div>
            </div>
            <button v-on:click="toggleShow">show or hidden</button>
        </div>   

    `
});