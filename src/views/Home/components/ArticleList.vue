<template>
  <div>
    <article-item
      v-for="item in articles"
      :key="item.id"
      :article="item"
    ></article-item>
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
      articles: []
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
    }
  }
}
</script>

<style></style>
