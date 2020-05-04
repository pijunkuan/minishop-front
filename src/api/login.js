import request from '../utils/request'

export function login(data){
	return request({
		url:'customer/login',
		method:'post',
		data
	})
}

export function register(data){
	return request({
		url:'customer',
		method:'post',
		data
	})
}

export function refresh_token(){
	return request({
		url:'customer/refresh',
		method:'get'
	})
}


export function get_user(){
	return request({
		url:'customer',
		method:'get'
	})
}

export function get_balance(){
	return request({
		url:'wallet/balance',
		method:'get'
	})
}