<template>
    <div class="page" v-bind:style="{backgroundImage:'url('+data+')'}" >  <!-- -->
    	
		  <button type="button" class="mui-btn" v-href="{name:'立即报名',query:{id:this.$route.query.id,uid:$route.query.uid}}" >立即报名</button>
	

     
         
         
    </div>
</template>
<style scoped>
    .page {background-size :100% 100%; height:100%;width:100%;position:absolute;}/*background:#011F3B url('image/apply/bg.png') no-repeat;*/
  .mui-btn{background-color: #FCB406;color:#fff;font-size: 20px;width:100%;border:none;text-align: center;margin-top:145%;border-radius:4px;font-family: "微软雅黑";height:100px;letter-spacing: 3px;opacity:0;filter:alpha(opacity=0)}  

    
</style>
<script>
    export default {
        mounted() {
            this.$api("Bssay/Entryreport?id="+this.$route.query.id).then(data => {
              this.data=data;
            });
        },
        components: {  },
        data() {
            return {
            data:null
            }
        },
        methods: {

        }
    }
</script>