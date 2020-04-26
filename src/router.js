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
	},
	{
		path:'/404',
		name:'404',
		hidden:true,
		component: r => require(['./pages/Error/404.vue'], r)
	},
	{
		path:'/login',
		name:'Login',
		component: r => require(['./pages/Login/Login.vue'],r)
	},
	{
		path:'/register',
		name:'Register',
		component: r => require(['./pages/Login/Register.vue'],r)
	},
	{
		path:'/forget',
		name:'Forget',
		component: r => require(['./pages/Login/Forget.vue'],r)
	},
	{
		path:'/',
		name:'Home',
		component: r => require(['./pages/Home/index.vue'], r)
	},
	{
		path:'/search',
		name:'Search',
		component: r => require(['./pages/Search/index.vue'], r)
	},
	{
		path:'/products',
		name:'Products',
		component: r => require(['./pages/Products/index.vue'], r)
	},
	{
		path:'/menu',
		name:'Menu',
		component: r => require(['./pages/Menu/index.vue'], r)
	},
	{
		path:'/types',
		name:'Types',
		component: r => require(['./pages/Types/index.vue'], r)
	},
	{
		path:'/product',
		name:'Product',
		component: r => require(['./pages/Product/index.vue'], r)
	},
	{
		path:'/cart',
		name:'Cart',
		component: r => require(['./pages/Cart/index.vue'], r)
	},
	{
		path:'/checkout',
		children:[
			{ 
				path:'index', 
				name:'Checkout', 
				component: r => require(['./pages/Checkout/Checkout.vue'], r) 
			},
			{ 
				path:'pay', 
				name:'Checkpay',
				component: r => require(['./pages/Checkout/Checkpay.vue'], r)
			},
			{
				path:'suc',
				name:'Checksuc',
				component: r => require(['./pages/Checkout/Checksuc.vue'], r)
			}
		]
	},
	{
		path:'/user',
		children:[
			{
				path:'home',
				name:'UserHome',
				component: r => require(['./pages/User/Home.vue'], r)
			},
			{
				path:'wallet',
				name:'UserWallet',
				component: r => require(['./pages/User/Wallet.vue'], r)
			},
			{
				path:'order',
				name:'UserOrder',
				component: r => require(['./pages/User/Order.vue'], r)
			},
			{
				path:'order/detail',
				name:'UserOrderDetail',
				component: r => require(['./pages/User/OrderDetail.vue'], r)
			},
			{
				path:'address',
				name:'UserAddress',
				component: r => require(['./pages/User/Address.vue'], r)
			}
		]
	},
	{
		path:'*',
		redirect:'/404',
		hidden:true
	}
]

export default new Router({
	routes:routes
})