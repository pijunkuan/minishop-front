<template>
<div>
    <div class="right-icon"></div>
    <div class="search-bar">
        <input v-model="search" />
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            search:''
        }
    }
}
</script>
