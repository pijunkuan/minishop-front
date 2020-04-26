import { getTheme, setTheme, removeTheme } from '@/utils/auth'

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
		setTheme({commit},theme){
			commit('SET_THEME',theme)
			setTheme(theme)
		},
		clearTheme({commit}){
			commit('SET_THEME','')
			removeTheme()
		}
	}
}

export default theme