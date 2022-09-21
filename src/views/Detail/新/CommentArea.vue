<template>
  <div>
    <van-cell title="单元格" value="内容">
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
          <span class="time"> {{ commentTime }} </span>
          <van-button
            size="small"
            round
            class="reply-content"
            @click="ShowPopup"
          >
            回复{{ commentsObj.reply_count }}
          </van-button>
        </div>
      </template>
      <van-button
        icon="good-job-o"
        size="small"
        class="Thumb-area"
        badge="commentsObj.like_count"
        >赞</van-button
      >
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    commentsObj: {
      type: Object,
      default: () => ({})
    },
    isShowReply: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ShowReply: this.isShowReply
    }
  },
  computed: {
    commentTime() {
      return dayjs(this.commentsObj.pubdate).fromNow()
    },
    navTitle() {
      if (this.commentsObj.reply_count) {
        return '暂无回复'
      }
      return `${this.commentsObj.reply_count}条回复`
    }
  },
  methods: {
    ShowPopup() {
      // console.log(11)
      this.$emit('get-reply')
      this.$emit('show-Poup', true)
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
