<template>
  <div class="release-notice">
    <ul class="form-content">
        
        <li>
            <span class="margin-r20">星闻标题：</span>
            <input class="notice-title margin-r20" type="text" placeholder="请输入要发布的星闻标题" maxlength="30" v-model="inputContent.title" required="required"></input>
            <span class="redm">注：标题最长30个字</span>
        </li>
        <li>
            <span class="margin-r20 position-rel">上传封面图：</span>
            <!-- <p class="upload margin-r20">上传</p> -->
            <upload :redminText="redminWord" :imageUrl="inputContent.image" ref="uploadImages"></upload>
            <!-- <span class="redm"></span> -->
        </li>
        <li>
            <span class="margin-r20 position-rel">星闻内容：</span>
            <div>
              <u-e ref="textEle" :defaultMsg="defaultMsg" :config="config"></u-e>
            </div>
        </li>
    </ul>
    <div class="box-btn">
        <button class="btn" @click="inputContentF($event)" data-type="storage">保存到草稿</button>
        <button class="btn" @click="inputContentF($event)" data-type="release">发布</button>
    </div>
    
  </div>
</template>

<script>
import Upload from '@/common/upload'
import VisualEditor from '@/common/visual-editor'
import UE from '@/common/ueditor'

export default {
  name: 'ReleaseNotice',
  data () {
    return {
        defaultMsg: '<span style="color: red">请输入文本内容</span>',
        config: {
            initialFrameWidth: 800,
            initialFrameHeight: 400
        },
        redminWord: null,
        inputContent: {}
    }
  },
  components: {
    Upload,
    VisualEditor,
    UE
  },
  created() {
    //初始化
    this.redminWord = '提示：最多上传1张，图片大小不得超过2M。像素大小最好为1360*640';
    this.inputContent = {'title': null, 'image': null, 'date': null, 'content': null, 'status': null};

    //强制刷新
    this.refreshD();

    //url来判断是否时编辑（判断id）

  },
  mounted() {
    //url来判断是否时编辑（判断id）
    if (this.$route.query.id) {
        this.$http.get(serverUrl + '/activity/ selectStarMessageListById.do',{
            params: {
                id: this.$route.query.id
            }
        })
        .then((res) => {
            let data = res.data.starMessage;
            this.inputContent.content = data.content;
            this.inputContent.title = data.title;
            this.inputContent.image = data.image;
            this.defaultMsg = data.content;
        })

    } 
  },
  methods: {
    refreshD() {
        var reloadUrl = window.location.href,
            queryUrl = this.$route.query;
        if (queryUrl.id)
            var pathUrlStr = this.$route.path + '?id=' + queryUrl.id;
        else
            var pathUrlStr = this.$route.path;

        if (reloadUrl.indexOf('reload') < 0) {
            this.$router.push({path: pathUrlStr + '#reload'});
            window.location.reload();
        }
    },
    inputContentF(e) {
        let event = e || window.event;
        let targetType = $(event.target).data('type');
        let objContent = this.inputContent;

        objContent.image = this.$refs.uploadImages.parentsM();
        objContent.date = new Date().getTime();
        objContent.content = this.$refs.textEle.getUEContent();

        //判断标题和content是否为空
        if (!this.inputContent.title) {
            this.$message.error('请输入标题');
            return;
        }
        if (!this.inputContent.content) {
            this.$message.error('请输入星闻内容');
            return;
        }

        if (this.$route.query.id) {
            if (targetType == 'storage') {
                //保存草稿箱接口
                objContent.status = '1';
                console.log(objContent.status)
                objContent['id'] = this.$route.query.id;
                this.requestionData('/activity/updateStarMessage.do',objContent,'保存成功','保存失败')
            } else if (targetType == 'release') {
                //发布接口
                objContent.status = '0';
                objContent['id'] = this.$route.query.id;
                this.requestionData('/activity/updateStarMessage.do',objContent,'发布成功','发布失败')
            }
        } else {
            if (targetType == 'storage') {
                //保存草稿箱接口
                objContent.status = '1';
                this.requestionData('/activity/addStarMessage.do',objContent,'保存成功','保存失败');
            } else if (targetType == 'release') {
                //发布接口
                objContent.status = '0';
                this.requestionData('/activity/addStarMessage.do',objContent,'发布成功','发布失败');
            }
        }
    },
    requestionData(url,reqParams,successT,errT) {
        let reqUrl = serverUrl + url;
        this.$http.get(reqUrl,{params: reqParams})
        .then((res) => {
            if (res.data.status == 1) {
                this.$message.success(successT);
            } else {
                this.$message.error(errT);
            }
            setTimeout(() => {
                this.$router.push({path: '/Releasenews'});
                window.location.reload();
            },1000)
        })
        .catch((err) => {
            console.log(err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .release-notice {
        width: 100%;
    }
    .margin-r20 {
        margin-right: 20px;
    }
    .redm {
        color: red;
        font-size: 12px;
    }
    .box-btn {
        text-align: center;
        margin-top: 20px;
        .btn {
            padding: 8px 10px;
            background: #FF6600;
            color: #fff;
            border: none;
            border-radius: 3px;
            margin: 0 20px 0 0;
        }
    }
    .form-content {
        padding: 10px 30px;
        font-size: 14px;
        li {
            width: 100%;
            min-height: 70px;
            line-height: 70px;
            position: relative;
            button {
                margin-right: 20px;
                border: 1px solid #000;
                border-radius: 3px;
                height: 30px;
                width: 100px;
                line-height: 30px;
                background: #fff;
                cursor: pointer;
            }
            .btn-active {
                background: #FF6600;
                color: #fff;
                border: none;
            }
            .notice-title {
                height: 30px;
                width: 280px;
                padding: 8px 5px;
                border-radius: 3px;
                border: 1px solid #CCC;
            }
            .position-rel {
                position: absolute;
                top: 0;
            }
            .upload {
                display: inline-block;
                height: 30px;
                width: 80px;
                line-height: 30px;
                text-align: center;
                background: #999999;
                border-radius: 3px;
                color: #fff;
            }
        }
    }
    

</style>