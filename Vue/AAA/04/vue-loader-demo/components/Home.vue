<template>
	<h3>我是主页</h3>
	<ul>
		<li><a v-link="{path:'/home/login'}">用户登录</a></li>
		<li><a v-link="{path:'/home/reg'}">用户注册</a></li>
	</ul>
	<div class="box">
		<router-view></router-view>
	</div>
</template>
<style scope>
	.box{
		border:1px dashed #000;
	}
</style>