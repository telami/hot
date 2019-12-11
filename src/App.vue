<template>
    <div id="app">
        <Index></Index>
    </div>
</template>


<script>
    import Index from './components/index.vue'

    export default {
        name: 'app',
        components: {
            Index
        }
    }
</script>

<style lang="scss">
    body {
        /*background-image: url(assets/bg.png);*/
        /*background-color: rgb(246,246,246);*/
        font-size: 28px;
        /*color: #333333;*/
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    }
</style>
