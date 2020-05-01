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
        <div class="login-form-switch">
            <div style="width:50%">
                <shop-button :type="regType === 'phone' ? 'default' : 'border'" :rounded="false" size="medium" @click="changeType('email','phone')">手机找回</shop-button>
            </div>
            <div style="width:50%">
                <shop-button :type="regType === 'email' ? 'default' : 'border'" :rounded="false" size="medium" @click="changeType('phone','email')">邮箱找回</shop-button>
            </div>
        </div>
        <shop-input ref="email" v-if="regType === 'email'" class="login-form-input" v-model="user.email" validate :rules="rules.email">
            <span slot="prepend" class="login-prepend">邮箱</span>
        </shop-input>
        <shop-input ref="phone" v-if="regType === 'phone'" class="login-form-input" v-model="user.phone" validate :rules="rules.phone">
            <span slot="prepend" class="login-prepend">手机号</span>
        </shop-input>
        <shop-button class="login-form-button" @click="confirmForget">忘记密码</shop-button>
        <div class="login-form-bottom">
            <div>已有账号？<div class="bottom-btn" @click="toLogin">登录</div></div>
            <div class="bottom-btn" @click="toRegister">注册账号</div>
        </div>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
    data(){
        return{
            regType:'phone',
            user:{
                email:'',
                phone:'',
            },
            rules:{
                email:[
                    { required:true, message:'请输入邮箱' }
                ],
                phone:[
                    { required:true, message:'请输入手机号' }
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
        changeType(oritype,type){
            this.$refs[oritype].clearValidate()
            this.regType = type
        },
        toLogin(){
            this.$router.push({name:'Login'})
        },
        toRegister(){
            this.$router.push({name:'Register'})
        },
        confirmForget(){
            this.$refs.phone.validation((valid)=>{
                if(valid){
                    this.$refs.email.validation((validate)=>{
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
    margin:60px 15px 30px;
    padding:45px 10px 30px;
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
    top:10px;
    left:50%;
    margin-left:-42px;
    border:2px solid #fff;
    border-radius:50%;
}

.login-form-switch{
    margin:0 10px 30px;
}
.login-form-switch>div{
    display:inline-block;
    vertical-align:middle;
}
.login-form-switch>div:first-child{
    text-align:right;
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
.login-form-bottom>div:last-child{
    text-align:right;
}

.bottom-btn{
    display:inline-block;
    @include base-color(1);
    font-weight:500;
    font-size:$middle-font-size;
}
</style>