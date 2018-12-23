<template>
	<h1>welcome Vue</h1>
	<h2 @click="change">{{msg}}</h2>
	<my-menu></my-menu>
</template>
<script>
	import Menu from './components/Menu.vue'

	export default{
		data(){
			return {
				msg:'welcome Vue ^_^'
			}
		},
		methods:{
			change(){
				this.msg='wahaha'
			}
		},
		components:{
			'my-menu':Menu
		}
	}
</script>
<style>
	body{
		background: #ccc
	}
</style>