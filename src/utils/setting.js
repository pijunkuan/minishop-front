/*
	进入页面前获取主题模版
 */
import router from '@/router'
import store from '@/store'
import defaultSettings from '@/settings'

router.beforeEach((to, from, next) => {
	document.title = defaultSettings.title
	store.dispatch('setTheme')
	next()
})