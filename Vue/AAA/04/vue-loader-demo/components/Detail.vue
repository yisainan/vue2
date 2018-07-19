<template>
	<strong>
		{{$route.params | json}}
		<br>
		{{$route.query | json}}
	</strong>
</template>