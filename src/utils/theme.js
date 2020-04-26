/*
	进入页面前获取主题模版
 */
import { getCustom } from '@/api/theme.js'
import { getTheme } from './auth.js'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

router.beforeEach((to, from, next) => {
	if(getTheme()){
		axios.get('/theme').then(res => {
			store.dispatch('setTheme',res.data.data.theme)
			next()
		})
	}else{
		getCustom().then(r=>{
			if(r.data.code === 0){
				store.dispatch('setTheme',r.data.data.themeName)
			}
			store.dispatch('setTheme','default')
			next()
		}).catch(()=>{
			store.dispatch('setTheme','default')
			next()
		})
	}
})