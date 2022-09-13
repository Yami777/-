<template>
  <div>
    <!-- 搜索框区域 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block>
          <span>搜索</span>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及展示区域 -->
    <van-tabs swipeable v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章详情-->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        :myChannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/views/Home/components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { getChannelAPI } from '@/api'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.getChannel()
  },
  // 1. ?? ==> 相当于||,常用语语句
  // 2. ?. ==> 可选链操作符，?前面是undefined，那么不会往后取值
  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        // console.log(data.data)
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          // status为真的时候继续往下运算
          status === 507 ?? this.$toast('请重新刷新')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
