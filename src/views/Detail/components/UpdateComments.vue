<template>
  <div>
    <!-- 评论区域 -->

    <comment-area
      :commentsObj="commentsObj"
      @show-Poup="isShowReply = $event"
      @get-reply="toReply"
      :index="index"
      :len="replyCommentsList.length"
    ></comment-area>
    <!-- 回复弹出层区域 -->
    <van-popup
      v-model="isShowReply"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <reply-comments
        :commentsObj="commentsObj"
        :Comment="Comment"
        @reply-comment="replyComment"
        :replyCommentsList="replyCommentsList"
        :len="replyCommentsList.length"
      ></reply-comments>
    </van-popup>
  </div>
</template>

<script>
import { getAllCommentsAPI, addCommentAPI } from '@/api'
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
    },
    fatherComment: {
      type: String,
      default: ''
    },
    replyList: {
      tyep: Array,
      default: () => []
    }
  },
  components: {
    CommentArea,
    ReplyComments
  },
  created() {
    this.getReplyComments()
  },
  data() {
    return {
      isShowReply: false,
      replyCommentsList: [],
      addReplyComment: [],
      Comment: this.fatherComment
    }
  },

  computed: {
    commentTime() {
      return dayjs(this.commentsObj.pubdate).fromNow()
    }
  },
  methods: {
    toReply() {
      this.isShowReply = true
    },
    // 评论回复的列表
    async getReplyComments() {
      const { data } = await getAllCommentsAPI('c', this.commentsObj.com_id)
      // console.log(data)
      this.replyCommentsList = [...data.data.results, ...this.replyCommentsList]
    },
    async replyComment(value) {
      try {
        const { data } = await addCommentAPI(
          this.commentsObj.com_id,
          value,
          this.$route.query.artId
        )
        this.replyCommentsList = [data.data.new_obj, ...this.replyCommentsList]
        this.$toast.success('回复成功')
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            this.$toast.fail('用户未登录')
          } else if (error.response.status === 403) {
            this.$toast.fail('作者已关闭评论')
          }
        } else {
          throw error
        }
      }
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
