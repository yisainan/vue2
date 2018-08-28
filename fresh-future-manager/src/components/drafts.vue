<template>
  <div class="drafts">
    <table class="hello_table">
        <thead class="hello_thead">
            <tr>
                <th>序号</th>
                <th>标题</th>
                <th>发布时间</th>
                <th>所属月份</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(items,index) in draftsList.root">
                <td>{{serialNum + index}}</td>
                <td>{{items.title}}</td>
                <td>{{items.date}}</td>
                <td>{{items.date}}</td>
                <td>
                    <button :nameId=items.id @click="examine($event)" class="btn">编辑</button>
                </td> 
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
            serialNum: 1 
        }
    },
    mounted(){
       this.getDatas()
    },
    methods:{
        //获取列表 
        getDatas:function(){
            var _this=this 
            _this.$http.get(serverUrl+'/activity/selectActivityList.do',{params:{'currentPage':_this.current,'limit':_this.display,status:1}}).then(function(response){ 
               _this.draftsList=response.data.list
               _this.total=response.data.list.total;
            })
        }, 
        examine: function (event) {
             //编辑
            var currentId = Number(event.currentTarget.getAttribute('nameId'));
                console.log(currentId)
                this.$router.push({path: '/ReleaseNotice', query: {'id': currentId}});
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
</style>