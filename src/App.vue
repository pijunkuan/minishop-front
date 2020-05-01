<template>
<div id="app" :data-theme="themeName + '-theme'" style="background-color:#f5f5f5">
    <page-header v-if="headerType === 'header'" class="page-header">
        <div slot="title">{{ $route.meta.title }}</div>
        <div slot="right">
            <shop-icon class="header-icon" name="xiaoxi" size="medium"></shop-icon>
        </div>
    </page-header>
    <page-search v-if="headerType === 'search'"></page-search>
    <router-view 
        class="page-container"
        :style="{bottom: (bottomType === 'menubar' ? 66 : 0) + 'px', top: (headerType === '' ? 0 : 49 + 'px')}" />
    <page-bottom
        v-if="bottomType === 'menubar'"
        class="page-bottom"
        :defaultIndex="defaultIndex"></page-bottom>
</div>
</template>

<script>
import PageHeader from '@/components/Modules/Layouts/PageHeader'
import PageSearch from '@/components/Modules/Layouts/PageSearch'
import PageBottom from '@/components/Modules/Layouts/PageBottom'
export default {
    components:{
        PageHeader,
        PageSearch,
        PageBottom
    },
    data(){
        return{
            headerType:'',
            bottomType:'',
            defaultIndex:0
        }
    },
    computed:{
        themeName(){
            const theme = this.$store.getters.theme
            return theme
        }
    },
    watch:{
        '$route'(to){
            if(to.name === 'Search' || to.name === 'Home') this.headerType = 'search'
                else if(to.name === 'UserHome') this.headerType = ''
                    else this.headerType = 'header'
            if(to.name !== 'Product' && to.name !== 'Cart' && to.name !== 'Checkout') this.bottomType = 'menubar'
                else this.bottomType = ''

            if(to.name === 'Home') this.defaultIndex = 1
                else if(to.name === 'Types') this.defaultIndex = 2
                    else if(to.name === 'Cart') this.defaultIndex = 3
                        else if(to.name === 'Login' || to.name === 'Register' || to.name === 'Forget' || to.name === 'UserHome') this.defaultIndex = 4
                            else this.defaultIndex = 0
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/style/base.scss';
.page-header{
    position:absolute;
    top:0;
    left:0;
    right:0;
}
.header-icon{
    color:rgba(255,255,255,.8)!important;
    text-align:right;
}

.page-container{
    position:absolute;
    left:0;
    right:0;
    background-color:$background-color;
    overflow-y:scroll;
}

.page-bottom{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    box-shadow:0 -1px 5px 2px rgba(0,0,0,0.05);
}
</style>
