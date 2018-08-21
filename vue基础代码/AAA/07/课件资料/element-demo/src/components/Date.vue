<template>
	<div id="date">
		<el-date-picker
	      v-model="value1"
	      type="date"
	      placeholder="选择日期"
	      :picker-options="ranger">
	    </el-date-picker>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				value1:'',
				ranger:{
					disabledDate(time) {
			           return time.getTime() < Date.now() - 8.64e7;
			        }
				}
			}
		}
	}
</script>