<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="page-popup-wrapper">
      <mt-button size="large" @click="popup1" ref="button">中部弹出Popup</mt-button >
      <mt-button size="large" @click="popup2">上侧弹出Popup</mt-button >
      <mt-button size="large" @click="popup3">右侧弹出Popup</mt-button >
      <mt-button size="large" @click="popup4">下侧弹出Popup</mt-button >
    </div>
    <mt-popup
      v-model="popupVisible1"
      popup-transition="popup-fade"
      class="mint-popup-1">
      <!-- :style="{top: buttonBotton + 10 + 'px'}" -->
      <h1>popup</h1>
      <p>/ ˈpɑpˌʌp /</p> 
      <p>n. 弹出式; [棒]内野飞球; 自动起跳式装置</p> 
      <p>adj. 弹起的; 有自动起跳装置的</p>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      position="top"
      class="mint-popup-2">
      <p>更新成功</p>
    </mt-popup>
    <mt-popup
      v-model="popupVisible3"
      position="right"
      class="mint-popup-3">
      <mt-button type="primary" size="large" @click="closePopup3"> 
        <label class="mint-button-text">关闭 popup</label>
      </mt-button >
    </mt-popup>
    <mt-popup
      v-model="popupVisible4"
      position="bottom"
      class="mint-popup-4">
      <mt-picker :slots="dateSlots"
        @change="onDateChange"
        :visible-item-count="5"
        :show-toolbar="false"></mt-picker>
    </mt-popup>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Popup',
  data () {
    return {
      examplename: 'Popup',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      buttonBotton: 0,
      dateSlots: [
        {
          flex: 1,
          values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
          className: 'slot1',
          textAlign: 'right'
        },
        {
          divider: true,
          content: '_',
          className: 'slot2'
        },
        {
          flex: 1,
          values: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    }
  },
  watch: {
    popupVisible2(val) {
      if(val) {
        setTimeout(() => {
          this.popupVisible2 = false;
        }, 2000)
      }
    }
  },
  mounted () {
    // this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom;
    // console.log(this.buttonBotton)
  },
  methods: {
    popup1 () {
      this.popupVisible1 = true;
    },
    popup2 () {
      this.popupVisible2 = true;
    },
    popup3 () {
      this.popupVisible3 = true;
    },
    closePopup3 () {
      this.popupVisible3 = false;
    },
    popup4 () {
      this.popupVisible4 = true;
    },
    onDateChange(picker, values) {
      if(values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.dateStart = values[0];
      this.dateEnd = values[0];
    }
  }
}
</script>
<style scoped>
.page-popup-wrapper {
  padding: 0 20px;
  top: 50%;
  position: absolute;
  width: 100%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
li {
  margin-top: 20px;
}
.mint-popup-1:before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -20px;
    right: 50px;
}
.mint-popup-1 {
    width: 200px;
    border-radius: 8px;
    padding: 10px;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
}
.mint-popup-1 h1 {
    font-size: 20px;
    color: #26a2ff;
}
.mint-popup-1 p {
    margin-bottom: 10px;
}
.mint-popup-2 {
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: rgba(0,0,0,.7);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.mint-popup-2 p {
    line-height: 50px;
    color: #fff;
}
.mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.mint-popup-3 .mint-button {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 5%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.mint-popup-4 {
    width: 100%;
}
</style>
