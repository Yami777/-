<template>
  <div>
    <!-- 二级路由展示区 -->
    <router-view></router-view>
    <!-- 底部导航区 -->
    <van-tabbar v-model="active" class="tabbar">
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
        </template></van-tabbar-item
      >
      <van-tabbar-item to="qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
        </template></van-tabbar-item
      >
      <van-tabbar-item to="/profile">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
          <span class="text">{{ isLogin ? '我的' : '未登录' }}</span>
        </template></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    .toutiao {
      font-size: 40px;
    }
    .text {
      font-size: 30px;
    }
  }
}
</style>
