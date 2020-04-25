import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
	{
		path:'/redirect',
		hidden:true,
		children:[
			{ path:'/redirect/:path*', components: r => require(['./pages/Redirect/index.vue'],r)}
		]
	}
]

export default new Router({
	routes:routes
})