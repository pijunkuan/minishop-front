import request from '../utils/request'

export function get_theme(){
	return request({
		url:'/theme',
		method:'get'
	})
}