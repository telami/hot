<template>
    <div class="container">
        <h2 class="cuIcon-hotfill text-center">互联网热榜</h2>
        <loading v-show="show"></loading>
        <div class="content">
            <div class="cat-wrapper flex flex-wrap justify-around">
                <div class="cat padding-5 radius" :class="currentId === item.id ? 'current' : ''"
                     @click="select(item.id)"
                     v-for="(item,index) in list" :key="index">
                    {{item.title}}
                </div>
            </div>
            <div class="info-wrapper shadow bg-white">
                <div class="info animation-shake padding-tb-sm margin-lr-sm" v-for="(info,index) in infos" :key="index">
                    {{index + 1}}. <a :href="info.url" target="_blank">{{info.title}}</a>
                </div>
            </div>
            <vueToTop :type="4" :color="'#007BFF'" :size="40"></vueToTop>
        </div>
        <a href="https://github.com/telami/hot/issues" class="cuIcon-edit edit"></a>
    </div>
</template>
<script>

  import Loading from "./loading";
  import vueToTop from 'vue-totop'

  export default {
    components: {Loading, vueToTop},
    data() {
      return {
        theme1: 'light',
        list: [],
        infos: [],
        currentId: 1,
        show: true
      }
    },
    methods: {
      getAllTypes() {
        fetch("https://www.printf520.com:8080/GetType").then(response => response.json())
          .then(data => {
            this.list = this.filterCats(data.Data).slice(0, 30)
            console.log(this.list)
            this.currentId = this.list[0].id
            this.show = false
          })
      },
      getInfo(currentId) {
        fetch("https://www.printf520.com:8080/GetTypeInfo?id=" + currentId).then(response => response.json())
          .then(data => {
            this.infos = this.filterTiebaUrl(data.Data)
          })
      },
      select(id) {
        this.currentId = id
        this.getInfo(id)
      },
      filterCats(cats) {
        let newCats = []
        for (let cat of cats) {
          if (cat.title !== '博客墙' && cat.title !== '反馈建议') {
            newCats.push(cat)
          }
        }
        return newCats.sort(this.compare);
      },
      filterTiebaUrl(infos) {
        let newCats = []
        for (let info of infos) {
          info.url = info.url.replace("amp;", "");
          newCats.push(info)
        }
        return newCats;
      },
      compare(o1, o2) {
        var val1 = o1.sort;
        var val2 = o2.sort;
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    created() {
      this.getAllTypes()
      this.getInfo(this.currentId);
    }
  }
</script>

<style lang="scss">

    @import "../common/main.css";
    @import "../common/icon.css";
    @import "../common/animation.css";

    $hot-font-size-sm: 15px;
    $hot-font-size-bg: 18px;
    $hot-base-color: #007BFF;
    .container {

        .content {
            max-width: 960px;
            margin: 0 auto;

            .cat-wrapper {
                font-size: $hot-font-size-sm;
                margin-bottom: 20px;

                .cat {
                    cursor: pointer;
                }

                .cat.current {
                    background-color: $hot-base-color;
                    border-radius: 2px;
                    color: #fff;
                }
            }

            .info-wrapper {
                text-align: left;
                margin-bottom: 20px;

                .info {
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

        .edit{
            position: fixed;
            bottom:30px;
            right:20%;
            text-decoration: none;
        }
    }
</style>
