<template>
  <div id="app">
    <el-button @click="get">普通按妞</el-button>
  
    <div>
      {{myMessage}}
    </div>

    <hr>

    <el-button type="primary">普通按妞</el-button>

    <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
    <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>

    <!-- 日历 -->
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>

    <!-- rate -->
    <el-rate v-model="val"></el-rate>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>

    <!-- 选项卡 -->
    <el-tabs type="card">
      <el-tab-pane label="用户管理">

        <el-badge :value="200" :max="99" class="item">
          <el-button size="small">评论</el-button>
        </el-badge>
      
      </el-tab-pane>
      <el-tab-pane label="配置管理">
          <el-switch
            v-model="bSign"
            on-text=""
            off-text="">
          </el-switch>
      </el-tab-pane>
      <el-tab-pane label="角色管理">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- button -->
    <myButton @click.native="get"></myButton>

  </div>
</template>

<script>
import myButton from './components/Button.vue'
import axios from 'axios'
export default {
  components:{
    myButton
  },
  name: 'app',
  data () {
    return {
      myMessage:'默认数据',
      msg: 'Welcome to Your Vue.js App',
      radio:"1",
      value1:'',
      val:5,
      bSign:true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海'
      }]
    }
  },
  mounted(){
    this.get();
  },
  methods:{
    get(){
      axios.get('https://api.github.com/users/itstrive')
      .then(function(res){
        this.myMessage=res.data;
      }.bind(this)).catch(function(err){
          console.log(err);
      })
    }
  }
}
</script>

<style>
.item{
  margin-top:30px;
}
</style>
