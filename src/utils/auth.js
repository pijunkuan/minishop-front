/*
	localStorage存储
 */
import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken () {
  return Cookies.get(TokenKey)
}
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getTheme(){
	return Cookies.get('themeName')
}

export function setTheme(theme){
	return Cookies.set('themeName',theme)
}

export function removeTheme(){
	return Cookies.remove('themeName')
}