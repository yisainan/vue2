<template>
    <div class="mypage">
        <div class="top top_03">
            <ul class="mui-text-center" style="padding:0px;">
                <li style="width: auto;min-width: 100px;">{{db.total||0}}<small>RMB</small><br /><span>累计提成</span></li>
            </ul>
        </div>
        <h4>
            提成说明
        </h4>
        <div class="introl">
            <p>
                将商城内任意商品界面分享给好友，好友通过分享页面成功购买商品后，将给予您该商品价格的百分之十提成。提成及时到账“我的财富”，可用于商城内购物抵现也可提现至微信钱包。本规则最终解释权归布斯有道所有。
            </p>
            </ol>
        </div>
        <h4>
            积分明细
        </h4>
        <ul class="my_ul">
            <li v-for="db in list">
                {{db.goods_name}} <br />
                <span>{{db.vname}} {{db.mctime | dateShort2}}</span>
                <a class="rf">
                    +{{db.current_money}}
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
            this.$api("Member/totalcommission").then(db => {
                this.db = db;
            });
            this.$api("Member/commissionlist").then(db => {
                this.list = db || [];
            });
        },
        components: {},
        data() {
            return {
                db: {},
                list: []
            }
        }
    }

</script>