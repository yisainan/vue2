<template>
	<el-upload
	  class="upload-demo inline-b"
	  :action="uploadUrl"
	  :on-preview="handlePreview"
	  :on-remove="handleRemove"
	  :file-list="fileList"
	  :before-upload="beforeUpload"
	  :on-success="uploadSuccess"
	  list-type="picture">
	  <el-button size="small" type="primary">点击上传</el-button>
	  <div slot="tip" class="el-upload__tip">{{redminText}}</div>
	</el-upload>
</template>
<script type="text/javascript">
	export default {
		name: 'upload',
		props: {
			redminText: String,
			imageUrl: String
		},
		data() {
			return {
		       fileList: [],
		       uploadUrl: serverUrl + '/activity/fileUpload.do',
		       uploadTotal: true,
		       imageFile: {}
		    };
		},
		methods: {
	      handleRemove(file, fileList) {
	      	console.log(fileList)
	      	if (fileList.length < 1) 
	      		this.fileList = [];
	      },
	      handlePreview(file) {
	        console.log(file);
	      },
	      beforeUpload(file) {
	      	this.imageFile = file;

	      	const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        	const isLt2M = file.size / 1024 / 1024 < 2;
        	if(!isJPG)
        		this.$message.error('上传图片只能是 JPG或PNG 格式!');
        	if(!isLt2M)
        		this.$message.error('上图片大小不能超过 2MB!');
        	if(this.fileList.length > 0) {
        		this.$message.error('只能上传一张图片!');
        		return false;
        	}
        	return isJPG&&isLt2M;
          },
          uploadSuccess(res) {

          	this.fileList = [{name: res.originalFilename,url: serverUrl + res.successText}];

          	if (res.flag == true) {
          		this.imageFile = res.successText;
          		this.$message.success('上传图片成功!');
          	}
          },
          parentsM() {
          	return this.imageFile;
          }
	    },
	    watch: {
	    	imageUrl(newV,oldV) {
	    		if (newV) {
	    			if (newV.indexOf('.jpg') > -1 || newV.indexOf('.png') > -1) {
		    			this.fileList = [{name: 'image', url: serverUrl + newV}];
		    		}
	    		}
	    	}
	    }
	}
</script>
<style lang="scss">
	.inline-b {
		display: inline-block;
		line-height: normal;
		margin-left: 95px;
		margin-top: 20px;
	}
	.form-content {
		li {
			.el-button {
				color: #fff;
				background: #20a0ff;
				line-height: normal;
				border: none;
			}
		}
	}
</style>