import Vue from 'vue'
Vue.directive('music',{
	bind:function(el,binding,vnode){
		let audio=el.children[1],
		 	img	=el.children[0];
		if(audio.paused){
          this.isPlay = true
          audio.play();
      }else{
          this.isPlay = false
          audio.pause();
      }

	}
})
