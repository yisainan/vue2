<template>
    <div class="mypage">
        <div class="top top_03">
            <ul>
                <li class="border">{{db.integral}} <br /><span>我的积分</span></li>
                <li>{{db.cash}}<small>RMB</small> <br /><span>可抵现</span></li>
            </ul>
        </div>
        <h4>
            积分说明
        </h4>
        <div class="introl">
            <ol class="my_ol">
                <li>本积分仅可在智盟+使用。</li>
                <li>积分查询直接用于支付智盟+商品订单，购物时直接抵现。</li>
                <li>积分查询:您可以在“个人中心-我的积分”中查询到您的积分详细情况</li>
                <li>用户获得但未使用的积分，将在下一个自然年底过期，智盟+将定期对过期的积分进行作废处理。例2015年12月31日将清空2014年度客户获得但未使用的积分</li>
                <li>购物1元即获得1积分，100积分抵扣1人民币</li>
            </ol>
        </div>
        <h4>
            积分明细
        </h4>
        <ul class="my_ul">
            <li v-for="db in list">
                {{type1(db.chage_state)}} <br /><span>{{db.ictime |dateShort}}</span>
                <a class="rf">
                    {{type2(db.chage_state)}}{{db.current_integral}}
                </a>
            </li>
            <li v-if="list.length==0" style="text-align: center;padding: 20px;">
                暂无记录
            </li>
        </ul>
    </div>
</template>
<script>
    //import {mapGetters,mapState,mapMutations,mapActions} from "vuex"
    //import Hello from './components/Hello'

    export default {
        mounted() {
            this.$api("Member/viptotal").then(db => {
                if (db == null) return;
                Object.assign(this.db, db);
            });
            this.$api("Member/integral_chage").then(db => {
                this.list = db || [];
            });
        },
        //props:["value"],
        components: {},
        data() {
            return {
                db: { integral: 0, cash: 0 },
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
                    case 2: return "购物赠送";
                    case 3: return "签到获得积分";
                    case 4: return "购物抵现";
                }
                return "未知";
            },
            type2(str) {
                var t = str - 0;
                if ([4].indexOf(t) > -1) return "-"
                return "+";
            }
        }
    }

</script>