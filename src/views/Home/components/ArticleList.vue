<template>
  <div class="article">
    <!-- 属性： -->
    <!-- @load:触底的时候触发load事件 -->
    <!-- offset：滚动条和底部距离多少的时候触发load事件，默认值是300px -->
    <!-- : immediate-check:初渲染的时候是否执行load事件,默认值是true-->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        v-model="loading"
        offset="100"
        :finished="finished"
        finished-text="没有更多文章了~"
        :error.sync="error"
        error-text="请求失败，请重新加载~"
        :immediate-check="false"
      >
        <article-item
          v-for="item in articles"
          :key="item.id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      // new Date().valueof()
      // Date.now()
      // +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        // js错误，直接上抛，400 上抛中文，507 直接上抛
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 手动模拟错误
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 若果是下滑下载放到数组后面，如果是下拉加载，新获取的下一页数据放到前面
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }

        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 无论是try和catch最后finally语句都会被执行
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子设置滚动条：定高和overflow：auto
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &:代表当前元素的亲父亲
  // ::-webkit-scrollbar:滚动条的滚动槽
  // ::-webkit-scrollbar-thumb:滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: aquamarine;
  }
  &::-webkit-scrollbar-thumb {
    background-color: chartreuse;
    border-radius: 10px;
  }
}
</style>
