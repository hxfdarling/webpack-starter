import './index.css'
import html from './index.html';
const ALT = 18;
export default {
	template: html,
	created() {
		window.addEventListener('keydown', this.keydown);
		window.addEventListener('keyup', this.keyup);
		this.win = nw && nw.Window.get();
		if (this.win) {
			var record = []; //fix before minimize ,window is maximize or fullscreen
			this.win.on('minimize', () => {
				if (this.state !== 'min') {
					this.state = 'min';
				}
				record.unshift('min');
				record.length = 2;
			})
			this.win.on('restore', () => {
				if (record[0] === 'min' && (
						record[1] === 'max' || record[1] === 'full'
					)) {
					this.state = record[1];
					return;
				}
				this.state = 'normal';
				record.unshift('normal');
				record.length = 2;
			})
			this.win.on('maximize', () => {
				if (this.state !== 'max') {
					this.state = 'max';
				}
				record.unshift('max');
				record.length = 2;
			})
			this.win.on('enter-fullscreen', () => {
				if (this.state !== 'full') {
					this.state = 'full';
				}
				record.unshift('full');
				record.length = 2;
			})
		}
	},
	data() {
		return {
			text: "",
			state: this.initState,
			preState: this.initState,
			alt: false //是否按下了alt按键
		}
	},
	props: {
		type: {
			default: 'mac',
			type: String
		},
		initState: {
			type: String,
			default: "normal"
		},
		handles: {
			type: String, //support handles change
			default: "all"
		}
	},
	watch: {

	},
	computed: {
		isFull() {
			return this.state === "full";
		},
		isMaxSize() {
			return this.state === "max";
		},
		cls() {
			return {
				"webkit-draggable": true,
				alt: this.alt,
				windows: this.type === 'windows',
				mac: this.type === 'mac'
			}
		},
		isMac() {
			return this.type === 'mac'
		},
		handlesMap() {
			var map = {}
			this.handles
				.split(',')
				.forEach(i => map[i] = true);
			console.log(map);
			return map;
		},
	},
	methods: {
		windowChange(action) {
			this.state = action;
			this.$emit('changeState', action);
			if (this.win) {
				//end handle ,becuse of parent component handle this action
				if (!this.handlesMap.all && !this.handlesMap[action]) {
					return;
				}
				switch (action) {
					case 'normal':
						this.win.restore();
						break;
					case 'max':
						this.win.maximize();
						break;
					case 'min':
						this.win.minimize();
						break;
					case 'close':
						this.win.close();
						break;
					case 'full':
						this.win.enterFullscreen();
						break;
				}
			}
		},

		keydown(e) {
			if (e.keyCode === ALT) { this.alt = true; }
		},
		keyup(e) {
			if (e.keyCode === ALT) { this.alt = false; }
		},
		min() {
			this.windowChange('min');
		},
		max() {
			if (this.isFull || this.isMaxSize) {
				this.windowChange('normal');
				return;
			}
			if (this.isMac && this.alt || !this.isMac) {
				this.windowChange('max');
				return;
			}
			this.windowChange('full');
		},
		close() {
			this.windowChange('close');
		}
	},
	beforeDestroy() {
		window.removeEventListener('keyup', this.keyup);
		window.removeEventListener('keydown', this.keydown);
		if (this.win) {
			this.win.removeEventListener('minimize');
			this.win.removeEventListener('restore');
			this.win.removeEventListener('maximize');
			this.win.removeEventListener('enter-fullscreen');
		}
	}
}