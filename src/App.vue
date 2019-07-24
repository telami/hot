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
        background-color: #f1f1f1;
        font-size: 28px;
        color: #333333;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    }
</style>
