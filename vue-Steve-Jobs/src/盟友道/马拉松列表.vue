<template>
    <div class="fbjbox">
        <div class="fbjbox1">
            <headBar />
        </div>
        <div class="fbjbox2">
            <pull up="true" down="true" @up="next" @down="shuaxin">
                <!--<div class="list">
                    <imgitem :src="first[1].url" v-if="first!=null" />
                </div>-->
              
                
     <div id="slider" class="mui-slider" >
	   <div class="mui-slider-group mui-slider-loop">
	    
	     <div class="mui-slider-item mui-slider-item-duplicate">
	       <a href="#">
	         <imgitem :src="first[3].url" v-if="first!=null" ></imgitem>
	       </a>
	     </div>
	    
	     <div class="mui-slider-item">
	       <a href="#">
	         <imgitem :src="first[1].url" v-if="first!=null" ></imgitem>
	       </a>
	     </div>
	    
	     <div class="mui-slider-item">
	       <a href="#">
	         <imgitem :src="first[2].url" v-if="first!=null" ></imgitem>
	       </a>
	     </div>
	     
	     <div class="mui-slider-item">
	       <a href="#">
	         <imgitem :src="first[3].url" v-if="first!=null" ></imgitem>
	       </a>
	     </div>
	    
	     <div class="mui-slider-item mui-slider-item-duplicate">
	       <a href="#">
	         <imgitem :src="first[1].url" v-if="first!=null"></imgitem>
	       </a>
	     </div>
	   </div>
	   <div class="mui-slider-indicator">
	     <div class="mui-indicator mui-active"></div>
	     <div class="mui-indicator"></div>
	     <div class="mui-indicator"></div>
	   </div>
	 </div>
      
  
                <div class="clear"></div>
                <ul class="mui-table-view list">
                    <li class="mui-table-view-cell mui-media" v-for="db in list">
                        <a @tap="link(db)">
                            <img class="mui-media-object mui-pull-left" v-bind:src="db.posters">
                            <div class="mui-media-body">
                                {{db.title}}
                                <p class='mui-ellipsis'>{{db.digest}}</p>
                            </div>
                        </a>
                    </li>
                </ul>
      
               
               
               
               
            </pull>
        </div>
    </div>
</template>
<style scoped>
    .mui-table-view .mui-media-object { line-height: 55px; max-width: 55px; height: 55px; }
    .mui-table-view-cell > a:not(.mui-btn) { white-space: inherit; font-size: 14px; font-family: "微软雅黑"; line-height: 17px; }
    .mui-ellipsis { margin-top: 5px; }
</style>
<script>
    import headBar from '../public/headBar'
    import pull from '../public/pull'
    import imgitem from '../public/imgitem'
    
    export default {
        mounted() {
            this.shuaxin()
           
        },
        components: { headBar, pull, imgitem },
        data() {
            return { list: [], first: null }
        },
        methods: {
            link(db) {
                var path = (db.not == "0" ? "/Praise/Story/" : "/Praise/Classic/") + db.id;
                this.$router.push({ path, query: { cmd: "Bssay/malaDetail" } });
            },
            next(done, top) {
                var page = this.list.length;
                if (top) page = 0;
                this.$api("Bssay/moreLifeMala", { page }).then(list => {
                    if (top) this.list = [];
                    this.first = list.first;
                    this.list = this.list.concat(list.friend || []);
                    done && done(page != 5);
                    mui("#slider").slider({interval: 3000});//轮播图片动态添加
                })
            },
            shuaxin(done) {
                this.next(done, true);
            }
        }
    }
</script>