<template>
  <div class="username-content">
    <!-- 头部区域 -->
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$parent.$parent.isShowName = false"
      @click-right="upDateUserName"
    />
    <!-- 昵称区域 -->
    <van-field
      placeholder="请输入用户名"
      maxlength="11"
      show-word-limit
      v-model="name"
    >
    </van-field>
  </div>
</template>

<script>
import { editUserMsgAPI } from '@/api'
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      name: this.value
    }
  },
  methods: {
    async upDateUserName() {
      // console.log(this.value)
      try {
        const data = await editUserMsgAPI({ name: this.name })
        console.log(data)
        this.$emit('input', this.name)

        this.$parent.$parent.isShowName = false
        this.$toast.success('更新成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登录失效，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.username-content {
  .editName {
    border: 0;
    font-size: 32px;
    color: #323233;
  }
}
</style>
