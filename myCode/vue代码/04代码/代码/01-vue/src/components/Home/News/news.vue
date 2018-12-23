<template>
  <div class="mui-content">
    <ul class="mui-table-view">
				<li v-for="item in news" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="{name: 'newsdetail', params: {id: item.id}}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body mui-ellipsis">
							{{item.title}}
							<p class='bottom'>
                <span>发表时间：{{item.add_time | fmtDate('YYYY-MM-DD')}}</span>
                <span>点击次数：{{item.click}}</span>
              </p>
						</div>
					</router-link>
				</li>

			</ul>
  </div>
</template>

<script>
  //导出组件
  export default {
    data () {
      return {
        news: []
      }
    },
    created() {
      this.getnews();
    },
    methods: {
      

      //发送请求获取数据
      getnews() {
        //以内已经全局引用mintui

        //提示正在加载
        //this.$indicator.open();

        //提示信息
        //this.$toast('提示信息')

        this.$indicator.open();
        let url = this.common.apiHost + 'getnewslist';
        this.$http.get(url).then((response) => {
          this.news = response.body.message;
          //关闭正在加载
          this.$indicator.close();

          
          
        })
      }
    }


  }
</script>

<style scoped>
  .bottom {
    display: flex;
    justify-content: space-between;
    color: dodgerblue;
  }
</style>