import { getTheme, setTheme, removeTheme } from '@/utils/auth'
import { get_theme } from '@/api/theme'

const theme = {
	state:{
		name:getTheme()
	},
	mutations:{
		SET_THEME:(state,theme)=>{
			state.name = theme
		}
	},
	actions:{
		setTheme({commit}){
			return new Promise((resolve,reject)=>{
				get_theme().then(r=>{
					commit('SET_THEME',r.data.body.theme)
					setTheme(r.data.body.theme)
					resolve()
				}).catch(e=>{
					commit('SET_THEME','purple')
					setTheme('purple')
					reject(e)
				})
			})
		},
		clearTheme({commit}){
			commit('SET_THEME','')
			removeTheme()
		}
	}
}

export default theme