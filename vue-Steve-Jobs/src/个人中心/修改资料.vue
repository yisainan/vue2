<template>
    <div class="page">
        <input type="text" value="" />
        <p class="mui-text-center mui-content">
            <button type="button" id="save" @tap="save">保存</button>
        </p>
    </div>
</template>
<style scoped>
    .page { margin-top: 30px; background-color: transparent; width: 90% !important; margin: 30px auto; }
    input[type=text] { margin-bottom: 0px !important; }
    #save { height: 45px; line-height: 25px; letter-spacing: 3px; font-size: 17px; width: 80% !important; color: #fff !important; background-color: #182F41; border: none; border-radius: 9px; margin-top: 40px; }
</style>
<script>
export default {
    mounted(){

    },
    components: {},
    data(){
        return{

        }
    },
    watch:{

    },
    methods:{
        save(){

        }
    }
    }
</script>
