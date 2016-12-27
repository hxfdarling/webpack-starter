<template>
	<ul>
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
			var list = [];
			for (let i = 0; i < 20; i++) {
				list.push({
					text: i,
					id: i
				})
			}
			return {
				data,
				list
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
	.item:hover{
		font-size: 18px;
	}
	
	.flip-list-move {
		transition: transform 1s;
	}
</style>