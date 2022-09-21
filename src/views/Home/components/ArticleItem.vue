<template>
  <div>
    <!-- 没有图片的结构  -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
      @click="toArticleMsg(article.art_id)"
    />

    <!-- 一张图片的结构 -->

    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      :label="label"
      @click="toArticleMsg(article.art_id)"
    >
      <van-image width="100" height="100" :src="article.cover.images[0]" />
    </van-cell>

    <!-- 三张图片的结构 -->

    <van-cell v-else :title="article.title" @click="toArticleMsg">
      <template #label>
        <van-image
          width="100"
          height="100"
          v-for="(item, index) in article.cover.images"
          :key="index"
          :src="item"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-disable */
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count}评论， ${dayjs(pubdate).fromNow()}`
    }
  },
  created() {
    // console.log(this.article)
  },
  methods: {
    toArticleMsg() {
      // console.log(222)
      this.$router.push({
        path: '/detail',
        query: {
          artId: this.article.art_id,
          autId: this.article.aut_id
        }
      })
    }
  }
}
</script>

<style></style>
