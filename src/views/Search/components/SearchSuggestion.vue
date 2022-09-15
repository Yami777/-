<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in hightLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title> <span v-html="item"></span></template>
    </van-cell>
  </div>
</template>

<script>
// 1、下载lodash：yarn add lodash
// 2、按需引入
// map
// - 返回新数组，长度和原数组一致，返回的结果就是新数组那一项的值
// 动态正则
// - /Angela/ig：忽略大小写，并且全局匹配（g）字面量形式的正则，不能动态生成正则的内容
// 动态正则：new RegExp（参数：正则的内容，'ig'：匹配条件）
// replace（）：第一个参数：想要被替换的字符串，第二个参数是替换后的字符串结果，也支持函数传值
// 字符串的replace
// - 字符串.replace（正则，函数）
// - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    // 当keywords变化的时候调用api
    keywords: {
      // 当输入第一个字符：决定渲染SearchSuggestion，先有组件后有结果，因此需要输入第一个字符的时候立即调用
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    hightLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        // console.log(data)
        // this.suggestions = data.data.options.filter((item) => Boolean(item))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
