import Vue from "vue";
import "weui";
import index from "./components/index.vue"
new Vue({
	data: {
		name: 'abc'
	},
	components: {
		index
	}
}).$mount('#emoji')