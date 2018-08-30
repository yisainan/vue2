<template>
    <div class="mui-content">
        <div class="title">
            <ul>
                <li>
                    <a href="#">全部</a>
                </li>
                <li>
                    <a href="#">家居生活</a>
                </li>
                <li>
                    <a href="#">摄影设计</a>
                </li>
                <li>
                    <a href="#">家居生活</a>
                </li>
                <li>
                    <a href="#">摄影设计</a>
                </li>
                <li>
                    <a href="#">家居生活</a>
                </li>
                <li>
                    <a href="#">摄影设计</a>
                </li>
                <li>
                    <a href="#">家居生活</a>
                </li>
                <li>
                    <a href="#">摄影设计</a>
                </li>
                <li>
                    <a href="#">家居生活</a>
                </li>
                <li>
                    <a href="#">摄影设计</a>
                </li>
            </ul>
        </div>

        <div class="images">
            <ul>
                <li>
                    <a href="#">
                        <img src="http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg" alt="">
                        <p class="cover">
                            <span>这是标题</span><br>
                            这是内容
                        </p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="http://ofv795nmp.bkt.clouddn.com//upload/201504/18/thumb_201504181230434303.jpg" alt="">
                        <p class="cover">
                            <span>这是标题</span><br>
                            这是内容
                        </p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    
    .title {
        overflow-x: auto;
        overflow-y: hidden;
    }
    
    .title>ul {
        width: 1000px;
    }
    
    .title>ul>li {
        display: inline-block;
        padding: 20px 5px;
    }
    
    .images {
        margin-top: 10px;
    }
    
    .images>ul {}
    
    .images img {
        height: 300px;
        width: 100%;
    }
    
    .images>ul>li {
        position: relative;
    }
    
    .images .cover>span {
        font-weight: bold;
    }
    
    .images .cover {
        color: #fff;
        position: absolute;
        left: 0px;
        bottom: 0px;
        background-color: rgba(92, 92, 92, 0.4);
        width: 100%;
        margin-bottom: 5px;
    }
</style>