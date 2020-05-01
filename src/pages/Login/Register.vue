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
                <shop-button :type="regType === 'phone' ? 'default' : 'border'" :rounded="false" size="medium" @click="changeType('email','phone')">手机注册</shop-button>
            </div>
            <div style="width:50%">
                <shop-button :type="regType === 'email' ? 'default' : 'border'" :rounded="false" size="medium" @click="changeType('phone','email')">邮箱注册</shop-button>
            </div>
        </div>
        <shop-input ref="email" v-if="regType === 'email'" class="login-form-input" v-model="user.email" validate :rules="rules.email">
            <span slot="prepend" class="login-prepend">邮箱</span>
        </shop-input>
        <shop-input ref="phone" v-if="regType === 'phone'" class="login-form-input" v-model="user.phone" validate :rules="rules.phone">
            <span slot="prepend" class="login-prepend">手机号</span>
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
        <shop-button class="login-form-button" @click="confirmLogin">注 册</shop-button>
        <div class="login-form-bottom">
            <div>已有账号？<div class="bottom-btn" @click="toLogin">登录</div></div>
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
            regType:'phone',
            user:{
                email:'',
                phone:'',
                password:''
            },
            passType:'password',
            rules:{
                email:[
                    { required:true, message:'请输入邮箱' }
                ],
                phone:[
                    { required:true, message:'请输入手机号' }
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
        changeType(oritype,type){
            this.$refs[oritype].clearValidate()
            this.regType = type
        },
        toLogin(){
            this.$router.push({name:'Login'})
        },
        toForget(){
            this.$router.push({name:'Forget'})
        },
        confirmLogin(){
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