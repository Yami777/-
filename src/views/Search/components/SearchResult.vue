<template>
  <div class="result">
    <!-- loading：触发load1事件的时候自动将loading改为true，因此调完接口需要手动改为false -->
    <!-- 首先请求数据，进行渲染，触发load事件之后再次请求数据，results为[] -->
    <!-- 绑定error，捕获到错误之后，将error改为true，显示错误提示文本 -->
    <van-list
      v-model="loading"
      @load="getResult"
      :finished="finished"
      finished-text="没有更多了~"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResult() {
      try {
        // 模拟抛错
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 发送请求
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  // overlay和auto基本一致
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
