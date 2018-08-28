<template>
    <div>
        <headBar />
        <template v-if="header.length>0">
            <swiper v-bind:list="header" hidetitle="true" @link="link" />
            <imgitem :src="heard_pic[0].url" :href="{name:'微众筹'}" title="微众筹" top=2 />
                        <imgitem :src="heard_pic[1].url" :href="{name:'异类圈'}" title="异类圈" top=1 />                    
            <div class="yqxtsdkn"></div>
            
        </template>
  
    </div>
    
    
    
   
    
    
</template>
<style scoped>
   
</style>
<script>
    import headBar from './headBar.vue'
    import swiper from '../public/swiper'
    import imgitem from '../public/imgitem'
    export default {
        mounted() {
            this.$api("Bsfamily/index", {}).then(obj => {
                this.header = obj.goods.map(a => {
                    return {
                        id: a.goods_id,
                        posters: a.goods_image, s_title: ""
                    }
                });
                this.heard_pic = obj.heard_pic;
                //sessionStorage.setItem("Bsfamily_heard_pic",heard_pic)
            });
        },
        components: { headBar, swiper, imgitem },
        data() {
            return {
                header: [],
                heard_pic: []
            }
        },
        
        methods: {
            link(db) {
                this.$router.push({ name: '商品详情', params: { id: db.id, uid: localStorage.getItem('uid') } });
            }
        }
    }
</script>