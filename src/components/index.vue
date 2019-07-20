<template>
    <div class="container">
        <div class="title">互联网热榜</div>
        <div class="content">
            <div class="cat-wrapper">
                <div class="cat" :class="currentId === item.id ? 'current' : ''" @click="select(item.id)"
                     v-for="(item,index) in list" :key="index">
                    {{item.title}}
                </div>
            </div>
            <div class="info-wrapper">
                <div class="info" v-for="(info,index) in infos" :key="index">
                    {{index + 1}}. <a :href="info.url" target="_blank">{{info.title}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                theme1: 'light',
                list: [],
                infos: [],
                currentId: 1
            }
        },
        methods: {
            getAllTypes() {
                fetch("https://www.printf520.com:8080/GetType").then(response => response.json())
                    .then(data => {
                        let cats = data.Data
                        cats.pop()
                        cats.pop()
                        this.list = cats
                        this.currentId = this.list[0].id
                    })
            },
            getInfo(currentId) {
                fetch("https://www.printf520.com:8080/GetTypeInfo?id=" + currentId).then(response => response.json())
                    .then(data => this.infos = data.Data)
            },
            select(id) {
                this.currentId = id
                this.getInfo(id)
            }
        },
        created() {
            this.getAllTypes()
            this.getInfo(this.currentId);
        }
    }
</script>

<style lang="scss">

    $hot-font-size-sm: 15px;
    $hot-font-size-bg: 18px;
    $hot-base-color: #FF6F61;
    .container {
        background-color: #fff;

        .title {
            background-color: #fff;
            position: fixed;
            height: 50px;
            font-size: 20px;
            line-height: 50px;
            text-align: center;
            width: 100%;
            font-weight: bold;
            z-index: 30;
        }
        .content {
            max-width: 960px;
            margin: 0 auto;
            padding-top: 60px;

            .cat-wrapper {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-around;
                font-size: $hot-font-size-sm;
                margin-bottom: 30px;
                background-color: transparent;
                border-color: transparent;
                .cat.current {
                    background-color: $hot-base-color;
                    border-radius: 2px;
                    color: #fff;
                }
            }

            .info-wrapper {
                text-align: left;
                border: 1px solid #e8e8e8;

                .info {
                    /*text-align: left;*/
                    padding: 12px 24px;
                    font-size: $hot-font-size-sm;
                    border-bottom: 1px solid #e8e8e8;

                    a {
                        text-decoration: none;
                    }

                    /* 未被访问的链接 */
                    a:link {
                        color: #0A0A0A;
                    }

                    /* 已被访问的链接 */
                    a:visited {
                        color: #808080;
                    }

                    /* 鼠标指针移动到链接上 */
                    a:hover {
                        color: $hot-base-color;
                    }

                    /* 正在被点击的链接 */
                    a:active {
                        color: #8B0000;
                    }
                }
            }
        }

    }
</style>
