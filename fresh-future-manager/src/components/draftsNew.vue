<template>
  <div class="draftsNew">
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
            <tr v-for='(init,index) in draftsNews.root'>
                <td>{{serialNum + index}}</td>
                <td>{{init.title}}</td>
                <td>{{init.date | date}}</td>
                <td>
                    <button :nameId=init.id @click="examine($event)" class="btn">编辑</button>
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
export default {
    name: 'draftsNew',
    data () {
        return {
            total: 10,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1,   // 当前的页数
            draftsNews:{},
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
            _this.$http.get(serverUrl+'/activity/selectStarMessageList.do',{params:{'currentPage':_this.current,'limit':_this.display,status:1}}).then(function(response){ 
               _this.draftsNews=response.data.list;
               _this.total=response.data.list.total;
            })
        },   
        examine: function (event) {
                //编辑
            var currentId = Number(event.currentTarget.getAttribute('nameId'));
                console.log(currentId)
                this.$router.push({path: '/Releasenews', query: {'id': currentId}});
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
            current:pointer;
        }
    }
</style>