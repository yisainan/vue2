import home from './components/home';
import timu from './components/timu';
import dati from './components/dati';
import right from './components/right';
import wrong from './components/wrong';
import first from './components/first';
import yaoyao from './components/shake';
import other from './components/other';
import buycar from './components/buycar';
import second from './components/second';
import three from './components/three';
import index from './components/index';
module.exports = function(VueRouter){
	const router = new VueRouter({
		routes:[
			{
				name:'home',
				path:'/',
				component: home
			},
			{
				name:'timu',
				path:'/timu',
				component: timu
			},
			{
				name:'index',
				path:'/index',
				component: index
			},
			{
				name:'dati',
				path:'/dati',
				component: dati
			},
			{
				name:'right',
				path:'/right',
				component: right
			},
			{
				name:'wrong',
				path:'/wrong',
				component: wrong
			},
			{
				name:'first',
				path:'/first',
				component: first
			},
			{
				name:'second',
				path:'/second',
				component: second
			},
			{
				name:'three',
				path:'/three',
				component: three
			},
			{
				name:'shake',
				path:'/shake',
				component: yaoyao
			},
			{
				name:'other',
				path:'/other',
				component: other
			},
			{
				name:'buycar',
				path:'/buycar',
				component: buycar
			}
		]
	})

	return router;
}