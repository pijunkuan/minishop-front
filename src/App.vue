<template>
    <div id="app" :data-theme="themeName + '-theme'">
        <router-view />
        <shop-input v-model="test" @change="inputtest" bordered></shop-input>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btnLoading:false,
            test:''
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