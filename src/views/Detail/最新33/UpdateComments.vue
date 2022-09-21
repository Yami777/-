<template>
  <div>
    <!-- 评论区域 -->

    <comment-area
      :commentsObj="commentsObj"
      @show-Poup="isShowReply = $event"
      @get-reply="toReply"
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
        :Comment="Comment"
        @reply-comment="replyComment"
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
    // console.log(this.commentsObj)
    // this.getReplyComments()
    console.log(this.replyCommentsList)
  },
  data() {
    return {
      isShowReply: false,
      replyCommentsList: [],

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
      this.getReplyComments()

      this.isShowReply = true
    },
    // 评论回复的列表
    async getReplyComments() {
      const { data } = await getAllCommentsAPI('c', this.commentsObj.com_id)
      console.log(data)
      this.replyCommentsList = [...data.data.results, ...this.replyCommentsList]

      // console.log(this.replyCommentsList)
    },
    replyComment(arr) {
      console.log(arr)
      this.replyCommentsList = [...arr, ...this.replyCommentsList]
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
