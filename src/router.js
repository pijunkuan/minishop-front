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
		meta:{ title:'登录' },
		component: r => require(['./pages/Login/Login.vue'],r)
	},
	{
		path:'/register',
		name:'Register',
		meta:{ title:'注册' },
		component: r => require(['./pages/Login/Register.vue'],r)
	},
	{
		path:'/forget',
		name:'Forget',
		meta:{ title:'忘记密码' },
		component: r => require(['./pages/Login/Forget.vue'],r)
	},
	{
		path:'/',
		name:'Home',
		meta:{ title:'首页' },
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
		meta:{ title:'全部商品' },
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
		meta:{ title:'分类菜单' },
		component: r => require(['./pages/Types/index.vue'], r)
	},
	{
		path:'/product',
		name:'Product',
		meta:{ title:'商品详情' },
		component: r => require(['./pages/Product/index.vue'], r)
	},
	{
		path:'/cart',
		name:'Cart',
		meta:{ title:'购物车' },
		component: r => require(['./pages/Cart/index.vue'], r)
	},
	{
		path:'/checkout',
		name:'Checkout',
		meta:{ title:'确认订单' },
		component: r => require(['./pages/Checkout/Checkout.vue'], r)
	},
	{
		path:'/checkpay',
		name:'Checkpay',
		meta:{ title:'支付订单' },
		component: r => require(['./pages/Checkout/Checkpay.vue'], r)
	},
	{
		path:'/checksuc',
		name:'Checksuc',
		meta:{ title:'提交成功' },
		component: r => require(['./pages/Checkout/Checksuc.vue'], r)
	},
	{
		path:'/user',
		name:'User',
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