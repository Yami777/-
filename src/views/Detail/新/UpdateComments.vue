<template>
  <div>
    <!-- 评论区域 -->
    <!-- <van-cell v-if="!commentsObj.length">
      <template #title>
        <div class="comment-content">
          <div class="comment-img">
            <van-image
              width="35"
              height="35"
              round
              :src="commentsObj.aut_photo"
            />
          </div>
          <div class="left-content">
            <div>{{ commentsObj.aut_name }}</div>
            <div>{{ commentsObj.content }}</div>
          </div>
        </div>
      </template>
      <template #label>
        <div>
          <span class="time">{{ commentTime }}</span>
          <van-button
            size="small"
            round
            class="reply-content"
            @click="toReply(index)"
          >
            回复{{ commentsObj.reply_count }}
          </van-button>
        </div>
      </template>
      <van-button
        icon="good-job-o"
        size="small"
        class="Thumb-area"
        :badge="commentsObj.like_count"
        >赞</van-button
      >
    </van-cell> -->
    <comment-area
      :commentsObj="commentsObj"
      @show-Poup="isShowReply = $event"
      @get-reply="toReply(index)"
      :index="index"
    ></comment-area>
    <!-- 回复弹出层区域 -->
    <van-popup
      v-model="isShowReply"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <reply-comments
        :commentsObj="commentsObj"
        :replyCommentsList="replyCommentsList"
      ></reply-comments>
    </van-popup>
  </div>
</template>

<script>
import { getAllCommentsAPI } from '@/api'
import dayjs from '@/utils/dayjs'
import ReplyComments from './ReplyComments.vue'
import CommentArea from './CommentArea.vue'
export default {
  props: {
    commentsObj: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: [String, Number]
    }
  },
  components: {
    CommentArea,
    ReplyComments
  },
  created() {
    // console.log(this.commentsObj)
  },
  data() {
    return {
      isShowReply: false,
      replyCommentsList: []
    }
  },

  computed: {
    commentTime() {
      return dayjs(this.commentsObj.pubdate).fromNow()
    }
  },
  methods: {
    toReply(index) {
      // console.log(index)
      this.getReplyComments()
      this.isShowReply = true
    },
    async getReplyComments() {
      const { data } = await getAllCommentsAPI('c', this.commentsObj.com_id)
      // console.log(data)
      this.replyCommentsList = data.data.results
      console.log(this.replyCommentsList)
    }
  }
}
</script>

<style scoped lang="less">
.comment-content {
  display: flex;

  .left-content {
    margin-left: 20px;
  }
}
.Thumb-area {
  border: 0;
  color: #3a3a3a;
}
.reply-content {
  margin-left: 70px;
}
</style>
