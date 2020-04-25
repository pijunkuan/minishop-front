import Mock from 'mockjs'

const loginData = ()=>{
	let data
	return {data:data}
}

Mock.mock('url',/post/i, loginData)