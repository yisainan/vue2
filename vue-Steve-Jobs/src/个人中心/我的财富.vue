<template>
    <div class="mypage">
        <div class="top">
            <p>¥$£</p>
            <span>{{db.money}}</span>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <a class="cz" style="padding-left: 50px; color:#37536D;" v-href="{name:'充值'}">充值</a>
            </li>
            <li class="mui-table-view-cell">
                <a class="tx" style="padding-left: 50px;color: #37536D;" v-href="{name:'提现'}">提现</a>
            </li>
        </ul>
        <h4>余额明细</h4>
        <ul class="my_ul">
            <li v-for="db in list">
                {{type1(db.state)}} <br /><span>{{db.mctime | dateShort2}}</span>
                <a class="rf">
                   {{type2(db.state)}}{{db.current_money}}
                </a>
            </li>
            <li v-if="list.length==0" style="text-align: center;padding: 20px;">
                暂无记录
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.$api("Member/vipwealth").then(db => {
                if (db == null) return;
                this.db = db;
            });
            this.$api("Member/wealthlist").then(db => {
                this.list = db || [];
            });
        },
        //props:["value"],
        components: {},
        data() {
            return {
                db: { money: 0, },
                list: []
            }
        },
        computed: {
            //...mapGetters(["vip"]),
            //...mapState({
            //_view:s=>s.view,
            //})
        },
        watch: {

        },
        methods: {
            type1(t) {
                switch (~~t) {
                    case 0: return "充值";
                    case 1: return "提现";
                    case 2: return "购物";
                    case 3: return "众筹";
                    case 4: return "推广商品锁定";
                    case 5: return "推广商品解锁";
                    case 6: return "退款或退货返还";
                    case 7: return "充值赠送";
                }
                return "未知";
            },
            type2(str) {
                var t = str - 0;
                if ([0, 5, 6, 7].indexOf(t) > -1) return "+"
                //0充值，1提现，2购物，3众筹，4推广商品锁定，5推广商品解锁，6-退款或退货返还,7-充值赠送
                //我的财富列表:接口增加state字段,区分金额的来源
                return "-";
            }
        }
    }

</script>