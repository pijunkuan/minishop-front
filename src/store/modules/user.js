import { login } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'

const user = {
	state:{
		token:getToken()
	},
	mutations:{
		SET_TOKEN:(state,token)=>{
			state.token = token
		}
	},
	actions:{
		login({commit},info){
			return new Promise((resolve,reject)=>{
				login(info).then(r=>{
					if(r.data.code === 0){
						commit('SET_TOKEN', r.data.data.token)
						setToken(r.data.data.token)
					}
				}).catch(e=>{
					reject(e)
				})
			})
		},
		logout({commit}){
			return new Promise((resolve)=>{
				commit('SET_TOKEN','')
				removeToken()
				resolve()
			})
		}
	}
}

export default user