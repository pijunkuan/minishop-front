import request from '../utils/request'

export function getCustom(){
	return request({
		url:'/theme',
		method:'get'
	})
}