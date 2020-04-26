import Mock from 'mockjs'

const theme = Mock.mock('/theme','get',()=>{
	return {
		code:200,
		data:{
			theme:'hotred'
		}
	}
})

export default { theme }