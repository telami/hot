<template>
    <div class="container">
        <div class="skeleton-wrapper">
            <div class="skeleton padding-sm margin-xs" v-for="(item,index) in skeletons" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'skeleton',
        data() {
            return {
                skeletons: []
            }
        },
        created() {
            let skeletons = [];
            for (let i = 0; i < 26; i++) {
                skeletons.push({"size":i})
            }
            this.skeletons = skeletons
        }
    }
</script>

<style lang="scss">
    @import "../common/main.css";

    .container {
        .skeleton-wrapper {
            .skeleton {
                background-color: #DCDCDC;
            }
        }
    }
</style>