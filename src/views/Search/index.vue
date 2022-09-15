<template>
  <div>
    <form action="/">
      <!-- 搜索框 -->
      <van-search
        class="search"
        show-action
        @cancel="$router.push('/')"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
      />
    </form>

    <!-- 搜索历史/建议/结果 -->

    <!-- 动态组件：通过is绑定组件名字进行渲染某个组件,eslint语法需要抽离变量 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史显示条件：搜索框的值空
      // 搜索建议显示条件：搜索框有值，并且不渲染搜索结果
      // 搜索结果显示条件：触发search事件，显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords储存起来
      // 用户手动敲回车或者点击了搜索建议
      // 储存搜索历史
      // 第一次储存的时候没有之前的keywords，因此先新增，后面每次搜索，都结构之前的，并且把新搜索的放在前面
      // 去重历史搜索
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
// class和style属性的特殊：
// 使用两个进行传属性的时候，vue自动帮你把class和伤透了合并到组件的根节点上
.search {
  // 属性选择器
  [role='button'] {
    color: #fff;
  }
}
</style>
