<template>
    <iframe v-if="src!=''" frameborder="0" width="100%" v-bind:height="height" v-bind:src="src" allowfullscreen></iframe>
</template>
<script>
export default {
    created(){
        this.height=(this.width||window.innerWidth)*9/16;
    },
    props:["src","width"]
    }
</script>