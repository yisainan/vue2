import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);

//import shangping from "./shangping"
//import gouwuche from "./gouwuche"
//import view from "./view"
import gwc from "./gwc"

const store = new Vuex.Store({
    modules: {
        gwc,
        //gouwuche,
        //view,
        //shouyin,
        //format
    }
})
export default store