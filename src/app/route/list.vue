<template>
	<ul>
		<input v-model:value="value" @input="change" @keydown.enter="sure"/>
		<transition-group name="flip-list">
		<li v-for="item in list" :key="item.id">
			<div class="item">list:<span>{{item.text}}</span></div>
		</li>
		</transition-group>
	</ul>
</template>
<script>
	import data from '../components/data.js';
	export default {
		data: function() {
			var list = [],
				idx = 0;
			for (let i = 0; i < 10; i++) {
				list.unshift({
					text: i,
					id: idx++
				})
			}
			return {
				idx,
				value: '',
				data,
				list
			}
		},
		updated() {},
		methods: {
			sure() {
				if (!this.value) {
					return;
				}
				this.list.unshift({
					text: this.value,
					id: this.idx++
				})
				this.value = '';
			},
			change() {

			}
		}
	}
</script>
<style>
	.item {
		padding-left: 24px;
		background-size: 18px;
		line-height: 23px;
	}
	
	.flip-list-move {
		transition: transform .3s;
	}
</style>