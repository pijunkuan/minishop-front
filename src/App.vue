<template>
    <div id="app" :data-theme="themeName + '-theme'">
        <router-view />
        <shop-input v-model="test" placeholder="test" bordered :rounded="false" validate :rules="rules">
        </shop-input>
        <div style="width:200px;height:300px;border-radius:50%;overflow:hidden;">
            <img style="" src="https://image.ibb2b.com/productcontent/2020/04/15/01e4072e-acfb-43c4-97c7-59c03ee8f0c2.jpg@0r_85Q" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btnLoading:false,
            test:'888',
            rules:[
                {required:true, message:'test'},
                {leng:6,message:'test2'}
            ]
        }
    },
    computed:{
        themeName(){
            const theme = this.$store.getters.theme
            return theme
        }
    },
    methods:{
        inputtest(){
            console.log(this.test)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/style/base.scss'
</style>