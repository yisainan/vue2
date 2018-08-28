<template>
    <div>
        <div class="content">
            <router-view />
        </div>
        <div class="bar2">
            <bar />
        </div>
    </div>
</template>
<style scoped>
    .content, .bar2 { position: absolute; width: 100%; left: 0; right: 0; height: auto; }
    .content { top: 0; bottom: 45px; overflow: auto; position: absolute; }
    .bar2 { bottom: 0; height: 45px; }
</style>
<script>
    import bar from '../public/navigation2'
export default {
    components: {bar},
    }
</script>
