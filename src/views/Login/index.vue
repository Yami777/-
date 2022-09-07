<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />

    <!-- 表单 -->
    <!-- van-field:输入框，text、password -->
    <!-- v-model：绑定的值 -->
    <!-- name：表示表单项 -->
    <!-- ：rules=[{required:是否为必填项，message：不通过表单验证时提示文案，pattern：正则，trigger：规则的触发时机（默认onblur）}] -->

    <van-form ref="form" @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            v-if="isShownCodeBtn"
            @click="sendCode"
            size="small"
            round
            type="default"
            class="btn"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            @finish="isShownCodeBtn = true"
            v-else
            :time="60 * 1000"
            format="ss 秒"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, senCodeAPI } from '@/api'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShownCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        // 将token存到vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push({ path: '/profile' })
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        // 细分失败
        // 如果是手机号或者验证码错了，用户能知道
        // error:1、js抛的错误 2、axios封装的error对象

        // error.response.data 后端返回的数据
        // error.response.status 后端返回的状态码
        // 验证码或者手机号错误
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1、js导致错误 2、507错误

          // 清除轻提示
          // console.dir(error) // 打印错误
          this.$toast.clear()
          throw error // 或者上抛js错误
          // this.$toast.fail('未知错误')
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 0、验证用户是否输入有效的手机号
      //  this.$refs.form.validate('mobile')返回一个promise对象
      await this.$refs.form.validate('mobile')

      this.loading()
      // 1、发送请求
      try {
        await senCodeAPI(this.mobile)

        // 2、显示倒计时组件
        this.isShownCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 429)
        ) {
          // axios的错误
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>
// vue-cli 提供语法：:deep()深度选择器
<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
