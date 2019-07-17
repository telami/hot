<template>
    <div class="container">
        <h3 class="title">互联网热榜</h3>
        <div class="cat-wrapper">
            <div class="cat" :class="currentId === item.id ? 'current' : ''" @click="select(item.id)"
                 v-for="(item,index) in list" :key="index">
                {{item.title}}
            </div>
        </div>
        <div class="info-wrapper">
            <div class="info" v-for="(info,index) in infos" :key="index">
                <a :href="info.url" target="_blank">{{info.title}}</a>
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
            }
        },
        watch: {
            currentId() {
                this.getInfo(this.currentId)
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
        .title {
            text-align: center;
        }

        .cat-wrapper {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            font-size: $hot-font-size-bg;
            margin: 0 50px 15px 50px;

            .cat.current {
                border-bottom: 2px solid;
                color: $hot-base-color;
            }
        }

        .info-wrapper {
            text-align: center;
            margin-bottom: 40px;

            .info {
                padding: 5px;
                margin: 5px;
                font-size: $hot-font-size-sm;

                a {
                    text-decoration: none;
                }

                /* 未被访问的链接 */
                a:link {
                    color: #3c1dff;
                }

                /* 已被访问的链接 */
                a:visited {
                    color: #B0C4DE;
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
</style>