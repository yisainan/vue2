<template>
    <ul>
        <li v-for="t in sp_value_name">
            <label>{{t.sp_name}}</label>
            <span v-for="item in t.val" @tap="click(t,item)" :class="{'active':item==t.select}">{{item}}</span>
        </li>
    </ul>
</template>
<style scoped>
    ul {
        padding: 0;
        margin: 5px;
        font-size: 14px;
    }
    
    li {
        list-style: none;
        margin-bottom: 8px;
    }
    
    label::after {
        content: ':';
    }
    
    span {
        color: #0A2D4B;
        font-size: 14px;
        display: inline-block;
        border: 1px solid #DCDCDC;
        color: #000;
        padding: 3px 10px;
        margin: 2px 5px;
        border-radius: 4px;
    }
    
    span.active {
        border-color: #F0845C;
    }
</style>
<script>
    export default {
        props: ["sp_value_name", "goodsinfo"],
        methods: {
            click(t, item) {
                if (t.select == item) {
                    t.select = null;
                    return;

                }
                t.select = item;
                var db = this.goodsinfo;
                for (let k in this.sp_value_name) {
                    let t = this.sp_value_name[k];
                    if (t.select == null) return;
                    //db = db.filter(a =>{
                    //  console.log(a.sp_value_name[k+''].val,t.select)
                    // return a.sp_value_name[k+''].val == t.select;
                    //});
                    db = db.filter(a => a.sp_value_name[k].val == t.select);
                }
                this.$emit('change', db[0]);
            }
        }
    }

</script>