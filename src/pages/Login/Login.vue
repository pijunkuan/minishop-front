<template>
<div class="login-background">
    <page-loading :loading="loading"></page-loading>
    <div class="login-form">
        <shop-image class="login-form-avatar" :width="80" circled>
            <div slot="placeholder">
                <shop-icon style="background-color:#fff" name="iconzhucetouxiang"></shop-icon>
            </div>
            <div slot="error">
                <shop-icon style="background-color:#fff" name="iconzhucetouxiang"></shop-icon>
            </div>
        </shop-image>
        <shop-input ref="username" class="login-form-input" v-model="user.username" validate :rules="rules.username" placeholder="请输入邮箱或手机号">
            <span slot="prepend" class="login-prepend">登录名</span>
        </shop-input>
        <shop-input ref="password" class="login-form-input" v-model="user.password" :type="passType" validate :rules="rules.password">
            <span slot="prepend" class="login-prepend">密码</span>
            <span @click="passType = 'text'" slot="append">
                <shop-icon v-if="passType === 'password'" name="yanjing-bi" size="mini"></shop-icon>
            </span>
            <span @click="passType = 'password'" slot="append">
                <shop-icon v-if="passType === 'text'" name="yanjing" size="mini"></shop-icon>
            </span>
        </shop-input>
        <shop-button class="login-form-button" @click="confirmLogin">登 录</shop-button>
        <div class="login-form-bottom">
            <div>还没有账号？<div class="bottom-btn" @click="toRegister">注册</div></div>
            <!-- <div class="bottom-btn" @click="toForget">找回密码</div> -->
        </div>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
    data(){
        return{
            user:{
                username:'',
                password:''
            },
            passType:'password',
            rules:{
                username:[
                    { required:true, message:'请输入用户名' }
                ],
                password:[
                    { required:true, message:'请输入密码' },
                    { min:6, message:'密码至少为6位' }
                ]
            },
            loading:false
        }
    },
    created(){
        setTimeout(()=>{
            this.loading = true
        },500)
        setTimeout(()=>{
            this.loading = false
        },2000)
    },
    methods:{
        toRegister(){
            this.$router.push({name:'Register'})
        },
        toForget(){
            this.$router.push({name:'Forget'})
        },
        confirmLogin(){
            this.$refs.username.validation((valid)=>{
                if(valid){
                    this.$refs.password.validation((validate)=>{
                        if(validate){
                            Toast('登录成功')
                            setTimeout(()=>{
                                this.$refs.username.clearValidate()
                                this.$refs.password.clearValidate()
                            },500)
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/base.scss';
.login-background{
    @include block-background(1);
}
.login-form{
    margin:80px 15px 0;
    padding:60px 10px 30px;
    background-color:#fff;
    border:1px solid $line-color;
    border-radius:10px;
    box-shadow:0 0 10px 5px rgba(0,0,0,0.15);
}
.login-prepend{
    color:$sub-font-color;
}

.login-form-avatar{
    position:absolute;
    top:30px;
    left:50%;
    margin-left:-42px;
    border:2px solid #fff;
    border-radius:50%;
}
.login-form-input{
    margin-bottom:15px;
}
.login-form-button{
    margin-top:20px;
}

.login-form-bottom{
    margin-top:10px;
    color:$sub-font-color;
    font-size:$small-font-size;
}
.login-form-bottom>div{
    display:inline-block;
    width:50%;
    vertical-align:middle;
}
// .login-form-bottom>div:last-child{
//     text-align:right;
// }

.bottom-btn{
    display:inline-block;
    @include base-color(1);
    font-weight:500;
    font-size:$middle-font-size;
}
</style>