<template>
    <div class="panl">
        <ul v-show="category && category.length">
            <li v-for="(val,index) of category" :key="val.mallCategoryId" @click="item(val,index)">
                <img :src="val.image" alt="" srcset="">
                <p>{{val.mallCategoryName}}</p>
            </li>
        </ul>
        <div class="ad">
            <img :src="advertesPicture" alt="" srcset="">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            type: Array,
            default(){
                return []
            }
        },
        advertesPicture: {
            type: String,
            default: ''
        }
    },

    methods: {
        item(val,index) {
            this.$emit('item',val,index)
        }
    },
}
</script>

<style lang="stylus" scoped>
    .panl 
        background: #EEEEEE
        padding: 15px 0 25px 0
        ul 
            width: 95%
            margin: 0 auto
            border-radius: 10px
            padding: 15px 0px 7px 0px
            box-sizing: border-box
            display: flex
            background: #fff
            box-shadow: 3px 4px 20px rgba(45,45,45,.15)
            li 
                flex: 1
                text-align: center
                img 
                    width: 70%
                    margin-bottom: 10px
                
                p 
                    font-size: 14px
        .ad 
            width: 100%
            margin-top: 10px
            img 
                width: 100%
            
        
    
</style>

