<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$parent.$parent.isShowBirthday = false"
    />
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { editUserMsgAPI } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      // console.log(dayjs(this.currentDate).format('YYYY-MM-DD'))
      this.currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      // console.log(this.currentDate)
      try {
        await editUserMsgAPI({ birthday: this.currentDate })
        if (Math.random() < 0.5) {
          throw new Error()
        }
        // console.log(data)
        this.$emit('input', this.currentDate)
        this.$parent.$parent.isShowBirthday = false
        this.$toast.success('更新成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登录失效，请重新登录')
        } else {
          this.$toast.fail('更新失败，请稍后重试')
          throw error
        }
      } finally {
        this.$parent.$parent.isShowBirthday = false
      }
    }
  }
}
</script>

<style></style>
