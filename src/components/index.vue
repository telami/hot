<template>
  <div class="container">
    <h1 class="cuIcon-hotfill text-center">互 联 网 热 榜</h1>
    <div class="content">
      <div class="content-sticky">
        <div ref="catWrapper" class="cat-wrapper">
          <div class="cat-content">
            <div class="cat margin-lr-xs padding-lr-xs padding-tb-xs radius"
                 :class="currentId === item.id ? 'current' : ''"
                 @click="select(index,item.id)"
                 ref="title"
                 v-for="(item,index) in list" :key="index">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="collapse" :class="isCollapse ? 'cuIcon-fold' : 'cuIcon-unfold'" @click="collapse()"></div>
        <div class="all-title-wrapper flex flex-wrap justify-between" v-show="isCollapse">
          <div class="all-title padding-5 margin-lr-xs margin-tb-5 radius"
               :class="currentId === item.id ? 'current' : ''"
               @click="select(index,item.id)"
               ref="title"
               v-for="(item,index) in list" :key="index">
            {{item.name}}
          </div>
        </div>
      </div>
      <loading v-show="show"/>
      <div v-if="infos" class="info-wrapper shadow bg-white">
        <div class="info padding-tb-sm margin-lr-sm" v-for="(info,index) in infos" :key="index">
          <div class="text-xs">
            <a :href="info.Url" target="_blank">{{info.Title}}</a>
          </div>
          <div v-if="info.Desc" class="desc text-14 padding-top-xs">
            {{info.Desc}}
          </div>
          <div class="text-center padding-top-xs" v-if="info.Url.includes('n.sinaimg.cn')">
            <img :src="info.Url">
          </div>
        </div>
        <div v-show="noMessage" class="no-message shadow bg-white text-18 flex align-center justify-center">
          暂无新的消息哦,去看看别的吧~
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
  import BScroll from '@better-scroll/core'

  export default {
    components: {Loading, vueToTop},
    data() {
      return {
        theme1: 'light',
        list: [],
        infos: [],
        currentId: 1,
        show: false,
        isCollapse: false,
        noMessage: false
      }
    },
    methods: {
      getAllTypes() {
        fetch("https://www.tophub.fun:8888/GetAllType").then(response => response.json())
          .then(data => {
            this.list = this.filterCats(data.Data.全部);
            this.currentId = this.list[0].id
            this.$nextTick(() => {
              this.initCategory();
            });
          })
      },
      getInfo(currentId) {
        this.show = true
        this.noMessage = false;
        fetch("https://www.tophub.fun:8888/GetAllInfoGzip?id=" + currentId).then(response => response.json())
          .then(data => {
            if (data.Data === undefined || data.Data.length === 0) {
              console.log("no message")
              this.noMessage = true;
            }
            this.infos = this.filterTiebaUrl(data.Data)
            this.show = false
          })
      },
      select(index, id) {
        this.infos = []
        this.currentId = id
        this.getInfo(id)
        let el = this.$refs.title[index];
        this.scroll.scrollToElement(el, 500, true);
        this.isCollapse = false
      },
      filterCats(cats) {
        let newCats = []
        for (let cat of cats) {
          if (cat.title !== '博客墙' && cat.title !== '反馈建议' && cat.title !== '汇总热榜') {
            newCats.push(cat)
          }
        }
        return newCats.sort(this.compare);
      },
      filterTiebaUrl(infos) {
        let newCats = []
        for (let info of infos) {
          info.Url = info.Url.replace("amp;", "");
          newCats.push(info)
        }
        return newCats;
      },
      initCategory() {
        this.scroll = new BScroll('.cat-wrapper', {
          scrollX: true,
          click: true
        });
      },
      collapse() {
        this.isCollapse = !this.isCollapse
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
      },
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

      .content-sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        margin-bottom: 10px;

        .cat-wrapper {
          font-size: $hot-font-size-sm;
          overflow: hidden;
          white-space: nowrap;

          .cat-content {
            /*padding: 5px;*/
            display: inline-block;

            .cat {
              cursor: pointer;
              display: inline-block;
              background-color: gray;
              color: #fff;
            }

            .cat.current {
              background-color: $hot-base-color;
              border-radius: 5px;
              color: #fff;
            }
          }

        }

        .collapse {
          position: absolute;
          padding: 0 4px;
          background: rgba(207, 217, 224, 0.8);
          color: #363636;
          right: 0;
          top: 0;
          /*height: 51px;*/
          line-height: 32px;
          font-size: 20px;
          cursor: pointer;
        }
      }

      .all-title-wrapper {
        font-size: $hot-font-size-sm;
        background-color: white;
        margin-top: 10px;

        .all-title {
          border: 1px solid grey;
          cursor: pointer;
          display: inline-block;
          /*background-color: gray;*/
          /*color: #fff;*/
        }

        .all-title.current {
          background-color: $hot-base-color;
          border-radius: 5px;
          color: #fff;
        }
      }

      .info-wrapper {
        text-align: left;
        margin-bottom: 20px;

        .info {
          font-size: $hot-font-size-sm;
          border-bottom: 1px solid #e8e8e8;

          .desc {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

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

        .no-message {
          height: 500px;
        }
      }
    }

    .edit {
      position: fixed;
      bottom: 30px;
      right: 20%;
      text-decoration: none;
    }
  }
</style>
