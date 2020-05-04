/*
	后端数据发起
 */

import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
	baseURL:'http://test.tvbeu.info/api/'
})

service.interceptors.request.use(
	config => {
		if(store.getters.token){
			config.headers['Authorization'] = 'Bearer ' + getToken()
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => response,
	error => {
		return Promise.reject(error)
	}
)

export default service