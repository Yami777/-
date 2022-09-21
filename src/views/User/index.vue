<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 信息修改 -->
    <div>
      <!-- 更新头像 -->
      <!-- 文件选择框 -->
      <!-- document.querySelector().click() -->
      <input
        type="file"
        hidden
        ref="file"
        accept=".png,.pdf,.jpg"
        @change="selectPhoto"
      />
      <van-cell is-link title="头像" @click="$refs.file.click()">
        <van-image round width="0.8rem" height="0.8rem" :src="avator" />
      </van-cell>
      <!-- 更新头像的弹出层 -->
      <van-popup
        v-model="isShowPhoto"
        closeable
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!-- 组件随着弹出层的弹出创建和隐藏，每次弹出都重新创建组件 -->
        <update-avatar
          v-if="isShowPhoto"
          :photo="photo"
          :avator.sync="avator"
        ></update-avatar>
      </van-popup>
    </div>
    <!-- 更新用户昵称 -->
    <div>
      <van-cell
        is-link
        title="昵称"
        :value="userName"
        @click="isShowName = true"
      ></van-cell>
      <!-- 用户昵称弹出层 -->
      <van-popup
        v-model="isShowName"
        :style="{ height: '100%' }"
        position="bottom"
      >
        <update-name v-model="userName"></update-name>
      </van-popup>
    </div>
    <!-- 更新用户性别 -->
    <div>
      <van-cell is-link title="性别" @click="isShowSex = true">{{
        genderNum ? '女' : '男'
      }}</van-cell>
      <van-popup
        v-model="isShowSex"
        :style="{ height: '30%' }"
        position="bottom"
      >
        <update-gender v-model="genderNum"></update-gender>
      </van-popup>
    </div>
    <!-- 更新用户生日 -->
    <div>
      <van-cell
        is-link
        title="生日"
        :value="birthday"
        @click="isShowBirthday = true"
      ></van-cell>
      <van-popup
        v-model="isShowBirthday"
        :style="{ height: '30%' }"
        position="bottom"
      >
        <update-birth v-model="birthday"></update-birth>
      </van-popup>
    </div>
  </div>
</template>

<script>
// 1、点击修改头像：手动触发input框的点击事件
// 2、获取用户选择的图片
// - 给input框绑定change事件
// - 用户选择的图片被保存在input：file的value属性上面(获取的是绝对路径)
// - 第二个保存的位置files数组里面（伪数组），保存的是File对象（照片的名字）
// File对象，文件的二进制对象
// 3、如何将file对象转成base64
// FileReader：文件阅读器
// - const fr= new FileReader（）
// fr.readAsDataURL（file）
// 接收读取的结果：异步读取，监听onload事件：fr.onload=（e）=>{e.target.result/*base64*/}
import { resolveToBase64 } from '@/utils/index'

import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateAvatar from './components/UpdateAvatar.vue'
import UpdateBirth from './components/UpdateBirth.vue'
import { getUserMsgAPI } from '@/api'

export default {
  components: {
    UpdateAvatar,
    UpdateName,
    UpdateGender,
    UpdateBirth
  },
  data() {
    return {
      isShowPhoto: false,
      isShowName: false,
      isShowSex: false,
      isShowBirthday: false,
      photo: '',
      avator: '',
      userName: '',
      gender: '',
      genderNum: '',
      birthday: ''
    }
  },
  created() {
    this.getUserMsg()
  },
  methods: {
    async selectPhoto() {
      // 获取用户选择的图片的file对象（默认只能选择一张图片）
      const file = this.$refs.file.files[0]

      const base64 = await resolveToBase64(file)
      // 传递base64给子组件
      this.photo = base64
      // console.log(base64)
      // file对象转换成img.src可识别的属性，file对象转成base64
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能连续选中同一张图片
      this.$refs.file.value = ''
    },
    async getUserMsg() {
      // console.log(1)
      try {
        const { data } = await getUserMsgAPI()
        // console.log(data)
        this.avator = data.data.photo
        this.userName = data.data.name
        this.genderNum = data.data.gender
        this.birthday = data.data.birthday
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
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
