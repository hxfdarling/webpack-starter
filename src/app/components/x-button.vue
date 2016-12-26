<template>
  <div class="x-button">
	 <button>{{msg}}</button>
  </div>
</template>

<script>
	export default {
		name: 'x-button',
		data() {
			return {
				msg: 'x-button'
			}
		}
	}
</script>

<style>
	.x-button {
		background: gray;
		display: inline-block;
	}
</style>