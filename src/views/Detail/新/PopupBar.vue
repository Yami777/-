<template>
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
</template>

<script>
export default {
  data() {
    return {
      comment: ''
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
