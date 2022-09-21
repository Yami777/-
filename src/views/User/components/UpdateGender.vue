<template>
  <div>
    <!-- 用户性别区域 -->
    <van-picker
      ref="updategender"
      title="更新性别"
      show-toolbar
      :columns="columns"
      @cancel="$parent.$parent.isShowSex = false"
      @confirm="onConfirm"
      :default-index="value"
      @change="sexChange"
    />
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
      columns: ['男', '女'],

      index: this.value
    }
  },

  methods: {
    async onConfirm() {
      try {
        await editUserMsgAPI({ gender: this.index })

        this.$emit('input', this.index)
        this.$parent.$parent.isShowSex = false
        this.$toast.success('更新成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登录失效，请重新登录')
        } else {
          throw error
        }
      }
    },
    sexChange(a, b, c) {
      this.index = c
    }
  }
}
</script>

<style></style>
