<template>
	<div class="edit">
		<textarea id="elm1" name="elm1" class="xheditor" rows="38" cols="80" style="width: 100%">
			请输入文本
		</textarea>
	</div>
</template>
<script type="text/javascript">
	// $('#elm1').xheditor(true)

	export default {
		name: 'edit',
		mounted() {
			
		},
		methods: {
			textContent() {
				return $('#elm1').val();
			},
			imageUp(data) {
				console.log(data)
			}
		}
	}

	
	
</script>
<style lang="scss">
	.edit {
		display: inline-block;
		margin: 20px 0 0 95px;
	}
</style>