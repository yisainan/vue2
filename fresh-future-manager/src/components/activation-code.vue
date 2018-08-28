<template>
  <div class="drafts">
  	<p class="creat-activation-code" @click="createCode">生成激活码</p>
  	<div class="tc" v-show="tcBlon">
  		<span class="closeTc" @click="createCode">×</span>
  		<ul>
  			<li>
  				<span style="margin-right: 46px">所属城市：</span>
  				<select v-model="selectVal">
  					<option>杭州</option>
  					<option>上海</option>
  				</select>
  			</li>
  			<li>
  				<span>本次生成数量：</span>
  				<input type="number" name="" placeholder="实例30" v-model="createNumber">
  			</li>
  		</ul>
  		<button class="save" @click="save">保存</button>
  	</div>
    <table class="hello_table">
        <thead class="hello_thead">
            <tr>
                <th>序号</th>
                <th>激活码</th>
                <th>城市</th>
                <th>生成时间</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(items,index) in draftsList.root">
                <td>{{serialNum + index}}</td>
                <td>{{items.cardNumber}}</td>
                <td>{{items.city}}</td>
                <td>{{items.date}}</td>
            </tr>
        </tbody>
    </table>
    <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
  </div>
</template>

<script>
import pagination from '@/common/pageination'
// console.log(pagination)
var webUrl="http://localhost:8080"
export default {
    name: 'hello',
    data () {
        return {
            total: 2,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1,   // 当前的页数
            draftsList:{},
            serialNum: 1,
            tcBlon: false,
            selectVal: '',
            createNumber:'',
            firstLetter: ''
        }
    },
    mounted(){
       this.getDatas()
    },
    methods:{
        //获取列表 
        getDatas:function(){
            var _this=this 
            _this.$http.get(serverUrl + '/message/selectcardlist.do',{params:{'currentPage':_this.current,'limit':_this.display,status:0}}).then(function(response){
            	
               _this.draftsList=response.data.list
               _this.total=response.data.list.total;
            })
        }, 
        createCode:function () {
        	this.tcBlon = !this.tcBlon;
        },
        save:function () {
        	const objData = {};
        	if (!this.selectVal) {
        		this.$message.error('请选择所属城市');
        		return;
        	}
        	if (!this.createNumber) {
        		this.$message.error('请输入生成数量');
        		return;
        	}
        	if (this.selectVal == '杭州') {
        		objData.citys = '0571';
        	} else {
        		objData.citys = '021';
        	}
        	objData.city = this.selectVal;
        	objData.ci = this.createNumber;

        	this.$http.get(serverUrl + '/message/activationCard.do',{params:objData}).then(function(data) {
        		console.log(data);

        	})

        	this.getDatas();
        	this.tcBlon = !this.tcBlon;
        },
        pagechange:function(currentPage){
           console.log(currentPage);  //当前的页数
           var _this = this;
           _this.current = currentPage;
           if (_this.current == 1) {
            _this.serialNum = 1;
           } else {
            _this.serialNum = (_this.current - 1) * 10 + 1;
           }
           this.getDatas()

        }
  },
    components: {
      'v-pagination': pagination,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .hello_table{
        width:100%;
        text-align: center;
        margin-top: 30px;
        color:#333;
        font-size:14px;
        tr{
            line-height: 40px;
        }
        .hello_thead tr{
            border-bottom: 1px solid #F2F2F2;
        }
        .hello_thead tr th {
            text-align: center;
        }
        .btn{
            cursor:pointer;
        }
    }
    .creat-activation-code {
    	width: 180px;
	    background: #EBEBEB;
	    text-align: center;
	    height: 30px;
	    line-height: 30px;
	    border: 1px solid #252525;
	    border-radius: 5px;
	    margin: 20px 0 0 20px;
	    cursor: pointer;
    }
    .tc {
    	position: fixed;
    	top: 50%;
    	left: 50%;
    	-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		width: 380px;
		height: 200px;
		background: #fff;
		border: 1px solid #000;
		z-index: 1002;
		ul {
			padding: 30px;
			line-height: 38px;
			li {
				span {
					margin-right: 15px;
				}
				select {
					height: 28px;
   					width: 100px;
				}
				input {
					height: 28px;
					padding: 4px 5px;
				}
			}
		}
		.save {
			background: #EBEBEB;
			border-radius: 5px;
			border: 1px solid #252525;
			width: 100px;
			height: 28px;
			display: block;
			margin: 0 auto;
			cursor: pointer;
		}
		.closeTc {
			position: absolute;
			right: 20px;
			top: 20px;
			display: inline-block;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			border: 1px solid #000;
			text-align: center;
			line-height: 20px;
			cursor: pointer;
		}
    }
</style>