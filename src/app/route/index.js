import './index.css';
import data from '../components/data.js';
export default {
  created: function () {
    // `this` 指向 vm 实例
    console.log('created', 'app page');
  },
  data: function () {
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
    toggleShow: function () {
      this.show = !this.show;
    }
  },
  template: `

        <div  >
            <transition name="fade">
                <div v-if="show">
                    <div v-for='item in items'>{{item.text}}</div>
                </div>
            </transition>
            <button v-on:click="show=!show">show or hidden</button>
        </div>

    `
}
