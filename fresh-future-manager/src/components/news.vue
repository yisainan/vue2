<template>
  <div class="news"> 
    <table class="hello_table">
        <thead class="hello_thead">
            <tr>
                <th>序号</th>
                <th>标题</th>
                <th>发布时间</th>                
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='(lists,index) in newLists.root'>
                <td>{{serialNum + index}}</td>
                <td>{{lists.title}}</td>
                <td>{{lists.date | date}}</td>
                <td>
                    <button :nameId=lists.id @click="examine($event)" class="btn">编辑</button>
                    <button :delecrBtn=lists.id @click="remove($event)" class="btn">删除</button>
                </td>
            </tr>
        </tbody>
    </table>
    <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
  </div>
</template>

<script>
import pagination from '@/common/pageination'

export default {
  name: 'news',
    data () {
        return {
            total: 10,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1, // 当前的页数
            newLists:{},
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
            _this.$http.get(serverUrl+'/activity/selectStarMessageList.do',{params:{'currentPage':_this.current,'limit':_this.display,status:0}}).then(function(response){
               _this.newLists=response.data.list;
               //console.log( _this.newLists)
               _this.total=response.data.list.total;
            })
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
           
        },  
        examine: function (event) {
            //编辑
            var currentId = Number(event.currentTarget.getAttribute('nameId'));
            //console.log(currentId)
            this.$router.push({path: '/Releasenews', query: {'id': currentId}});
            },
        //删除
     remove(event){
            var _this = this;
            var currentId = Number(event.currentTarget.getAttribute('delecrBtn'));  //id
            _this.$confirm('您确认删除吗？', '提示', {
                    type: 'warning'
                }).then(function(){
                    _this.$http.get(serverUrl +'/activity/deleteStarMessageById.do',{params:{'id':currentId}}).then(function (response) {
                        _this.getDatas();
                        _this.$message({
                            type: 'success',
                            message: '该课程已成功删除！'
                        });
                    })
                }).catch(function() {
                    _this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
       
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
    .page{
        float:right;
        margin-bottom: 15px;
       padding-right: 127px;
       padding-top: 50px;
    }
</style>
