<template>
  <div>
    <van-nav-bar left-arrow @click-left="$parent.$parent.isShowReply = false">
      <template #title>{{ navTitle }} </template>
    </van-nav-bar>
    <comment-area :commentsObj="commentsObj"></comment-area>
    <van-divider>全部回复</van-divider>
    <comment-area
      v-for="(item, index) in replyCommentsList"
      :key="index"
      :commentsObj="item"
    ></comment-area>
    <van-divider>没有更多了</van-divider>
    <!-- 底部区域 -->
    <van-tabbar>
      <van-button type="default" size="large" @click="isShowComments = true"
        >发布评论</van-button
      >
    </van-tabbar>

    <!-- 评论弹出框 -->
    <van-popup
      v-model="isShowComments"
      :style="{ height: '20%' }"
      position="bottom"
    >
      <div class="bigCommentsBox">
        <van-field
          class="vanField"
          type="textarea"
          maxlength="50"
          rows="3"
          autosize=""
          show-word-limit
          placeholder="请输入评论"
          v-model.trim="comment"
        />

        <div class="releaseBox" @click="releasBtn">发布</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import CommentArea from './CommentArea.vue'
export default {
  props: {
    commentsObj: {
      type: Object,
      default: () => ({})
    },
    replyCommentsList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CommentArea
  },
  data() {
    return {
      isShowComments: false,
      comment: ''
    }
  },
  computed: {
    commentTime() {
      return dayjs(this.commentsObj.pubdate).fromNow()
    },
    navTitle() {
      if (this.commentsObj.reply_count) {
        return `${this.commentsObj.reply_count}条回复`
      }
      return '暂无回复'
    }
  },
  methods: {
    releasBtn() {
      console.log(55)
    }
  }
}
</script>

<style scoped lang="less">
.bigCommentsBox {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  :deep(.vanField) {
    background-color: #f5f7f9;
    padding: 10px 16px;
  }
  .releaseBox {
    width: 2rem;
    text-align: center;
    padding: 0;
    font-size: 0.37333rem;
    color: #6ba3d8;
  }
}
</style>
