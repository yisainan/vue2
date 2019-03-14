<template>
    <ul>
        <li v-for="val in citiesList" 
            :key="val" @click="city" 
            @touchstart.prevent="hiddleTouchstat" 
            @touchmove="hiddleTouchmove"
            @touchend="hiddleTouchend"
            :ref="val"
         >{{val}}</li>
    </ul>
</template>

<script>
export default {
  props: ["cities"],
  data() {
    return {
      touchStatus: false //标识符
    };
  },
  computed: {
    citiesList() {
      let arr = []
      for (const k of Object.keys(this.cities)) {
          arr.push(k)
      }
      return arr
      
    }
  },
  methods: {
    city(e) {
      // 向外触发事件
      this.$emit("change", e.target.innerHTML);
    },
    hiddleTouchstat() {
      this.touchStatus = true;
    },
    hiddleTouchmove(e) {
      if (this.touchStatus) {
        const startY = this.$refs["A"][0].offsetTop; //A 距离顶部的高度
        const touchY = e.touches[0].clientY - 83;
        const index = Math.floor((touchY - startY) / 25); //当前手指滑动的位置
        if (index >= 0 && this.citiesList.length) {
          this.$emit("change", this.citiesList[index]);
        }
      }
    },
    hiddleTouchend() {
      this.touchStatus = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
ul {
    position: fixed;
    right: 0;
    top: 83px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #00B4CE;

    li {
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
}
</style>

