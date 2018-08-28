<template>
	<div class=" page">

		
		<pull up="true" down="true" @up="next" @down="update">
			<ul class="mui-table-view">
			<li class="mui-table-view-cell" v-for="item in db" v-bind:class="'finish'+item.is_read">{{item.mess}}<br/>{{item.money}}<span class="time">{{item.time}}</span></li>
			</ul>
			<div v-if="db.length==0"  style="text-align: center;margin-top:50%;">暂时没有信息</div>
		    <div v-if="db!=[]&&nomore" class="nomore">没有更多信息啦~</div>
		</pull>
		
		
	  
	

	</div>
	</template>
<style scoped="">
	.page{background: #fff;font-family: "微软雅黑";}
	/*.finish0{color:red}*/
	.mui-scroll-wrapper{ position: absolute;}
	.finsh0{color:#000}
	.finsh1{color:#ccc;}
	.time{font-size:13px;font-size: 13px; color: #666; float: right;}
	.nomore{position:absolute;bottom: 0px;left:30%;}
</style>
<script>
  import pull from '../public/pull'
 export default {
        mounted() {
  console.log(this.db.length)
   this.update();
        },
        components: {pull},
        data() {
            return {
                  db:[],
                  nomore:false,
            }
        },
        computed: {

        },
       methods: {
            update(done) {
                this.next(done, true);
            },
            next(done, update) {
                var page = (this.db || []).length;
                if (update) {page = 0;}
                this.$api("Zhongchou/messinfo", { page }).then((list) => {
                    var news = list;
                    if (news == null || news.length == 0) {
                    	if(page==0)return done &&done();
                    	if(page>0)this.nomore=true;
                    	return done &&done(true);

                    }
                    this.db = (this.db || []).concat(news); 
                    console.log(news)
                    done && done();
                });
            }
        }
    }
</script>
