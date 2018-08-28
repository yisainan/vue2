import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ReleaseNotice from "@/components/release-notice";
import drafts from "@/components/drafts";
import Releasenews from '@/components/Releasenews'
import news from "@/components/news";
import draftsNew from "@/components/draftsNew";
import Login from "@/components/login";
import ActivationCode from "@/components/activation-code";

Vue.use(Router)

export default new Router({
  routes: [
  	{
  	  path: '/',
      component: Login
  	},
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/ReleaseNotice',
      name: 'ReleaseNotice',
      component: ReleaseNotice
    },
    {
      path: '/drafts',
      name: 'drafts',
      component: drafts
    },
    {
      path: '/Releasenews',
      name: 'Releasenews',
      component: Releasenews
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/draftsNew',
      name: 'draftsNew',
      component: draftsNew
    },
    {
      path: '/ActivationCode',
      name: 'ActivationCode',
      component: ActivationCode
    }
  ]
})
