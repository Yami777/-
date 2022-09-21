<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />

    <!-- 内容 -->
    <article class="markdown-body">
      <div v-html="contentArr.title" class="article-title"></div>
      <van-cell :border="false">
        <!-- 左侧内容 -->
        <template #title>
          <div class="aut-content">
            <van-image
              width="1.2rem"
              height="1.2rem"
              round
              :src="contentArr.aut_photo"
              none
            />
            <div class="text-content">
              <div>{{ contentArr.aut_name }}</div>
              <div>{{ postTime }}</div>
            </div>
          </div>
        </template>

        <!-- 右侧关注 -->
        <div>
          <van-button
            v-if="contentArr.is_followed"
            round
            size="small"
            class="focused-btn"
            icon="success"
            @click="cancelFocus"
          >
            已关注
          </van-button>
          <van-button
            v-else
            round
            size="small"
            class="focus-btn"
            icon="plus"
            @click="toFocus"
          >
            关注
          </van-button>
        </div>
      </van-cell>
      <p v-html="contentArr.content" class="main-content"></p>

      <van-divider>正文结束</van-divider>

      <!-- 文章评论区域 -->
      <div v-if="commentList.length">
        <update-comments
          v-for="(item, index) in commentList"
          :key="index"
          :commentsObj="item"
          :index="index"
          :fatherComment="comment"
          :replyList="replyList"
        ></update-comments>
      </div>
      <van-divider>没有更多了</van-divider>
    </article>

    <!-- 底部导航区域 -->

    <!-- 底部导航 -->
    <van-goods-action class="tabbar-content">
      <van-goods-action-button
        type="danger"
        text="写评论"
        color="#fff"
        class="comments-btn"
        @click="isShowComments = true"
      />
      <van-goods-action-icon icon="comment-o" :badge="commentList.length" />
      <van-goods-action-icon
        :icon="collected ? 'star' : 'star-o'"
        :color="collected ? ' #ff5000' : ''"
        @click="collectArticle"
      />
      <!-- 点赞 -->
      <van-goods-action-icon
        icon="good-job-o"
        @click="LikeArticle"
        color="#ff5000"
      />

      <van-goods-action-icon icon="share-o" />
    </van-goods-action>

    <!-- 底部导航弹出框 -->
    <van-popup
      v-model="isShowComments"
      :style="{ height: '20%' }"
      position="bottom"
    >
      <popup-bar @add-comment="addComment" :fatherComment="comment"></popup-bar>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import dayjs from '@/utils/dayjs'
import {
  getArticleItemAPI,
  focusUserAPI,
  cancelFocusAPI,
  addCommentAPI,
  getAllCommentsAPI,
  likeArticleAPI,
  cancelLikeAPI,
  cancelDislikeAPI,
  collectArticleAPI,
  cancelCollectAPI
} from '@/api'
import PopupBar from './components/PopupBar.vue'
import UpdateComments from './components/UpdateComments.vue'

export default {
  components: {
    UpdateComments,
    PopupBar
  },
  data() {
    return {
      contentArr: {},
      postTime: '',
      isShowComments: false,
      comment: '',
      commentList: [],
      replyList: [],
      imgList: [],
      like: -1,
      collected: false
    }
  },
  created() {
    this.getArticleItem()
    this.getAllComments()
  },
  computed: {},
  methods: {
    // 获取文章详情
    async getArticleItem() {
      try {
        const { data } = await getArticleItemAPI(this.$route.query.artId)
        this.contentArr = data.data
        console.log(data)
        this.postTime = dayjs(this.contentArr.pubdate).fromNow()
        this.like = data.data.attitude
        console.log(this.like)

        this.collected = data.data.is_collected
        // console.log(this.collected)
        this.$nextTick(() => {
          const body = document.querySelector('.markdown-body')
          const imgs = body.querySelectorAll('img')
          imgs.forEach((item, index) => {
            this.imgList.push(item.src)
            item.onclick = () => {
              ImagePreview({ images: this.imgList, startPosition: index })
            }
          })
        })
      } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 404) {
          this.$toast.fail('文章获取失败，请刷新')
        }
      }
    },
    onClickLeft() {
      this.$router.back()
    },
    // 关注
    async toFocus() {
      try {
        await focusUserAPI(this.$route.query.autId)
        this.contentArr.is_followed = true

        this.$toast.success('关注成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户未认证，请重新登录')
        } else {
          throw error
        }
      }
    },
    // 取消关注
    async cancelFocus() {
      try {
        await cancelFocusAPI(this.$route.query.autId)
        this.contentArr.is_followed = false
        this.$toast.success('已取消')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户未认证，请重新登录')
        } else {
          throw error
        }
      }
    },
    // 获取所有的文章评论
    async getAllComments() {
      const { data } = await getAllCommentsAPI('a', this.$route.query.artId)
      // console.log(data)
      this.commentList = data.data.results
    },
    // 新增文章评论
    async addComment(value) {
      this.comment = value
      console.log(this.comment)
      // 对文章进行评论

      try {
        const { data } = await addCommentAPI(
          this.$route.query.artId,
          this.comment
        )
        console.log(data)
        this.commentList = [data.data.new_obj, ...this.commentList]
        // console.log(this.commentList)
        this.$toast.success('评论成功')

        this.isShowComments = false
        this.comment = ''
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
    },
    // 对文章点赞
    async LikeArticle() {
      console.log(this.$route.query.artId)
      const { data } = await likeArticleAPI(this.$route.query.artId)
      console.log(data)
    },
    async cancelLike() {
      const { data } = await cancelLikeAPI(this.$route.query.artId)
      console.log(data)
    },
    noLikeArticle() {
      console.log(555)
    },
    async cancelDislike() {
      console.log(55)
      const data = await cancelDislikeAPI(this.$route.query.artId)
      console.log(data)
    },
    // 收藏文章
    async collectArticle() {
      if (this.collected) {
        // 取消收藏
        try {
          await cancelCollectAPI(this.$route.query.artId)
          this.collected = false
          this.$toast.success('已取消收藏')
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.$toast.fail('用户未认证，请重新登录')
          } else {
            throw error
          }
        }
      } else {
        // 收藏文章
        try {
          await collectArticleAPI(this.$route.query.artId)
          this.collected = true
          this.$toast.success('收藏成功')
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.$toast.fail('用户未认证，请重新登录')
          } else {
            throw error
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  height: calc(100vh - 200px);
  overflow: auto;
  margin: 0 auto;
  padding: 45px;
  .article-title {
    font-size: 0.53333rem;
    padding: 50px 32px;
    font-weight: 700;
  }
  .aut-content {
    display: flex;
    align-items: center;
    height: 100%;

    .text-content {
      margin-left: 20px;
      color: #3a3a3a;
      div {
        font-size: 12px;
        line-height: 36px;
      }
    }
  }
  :deep(.focus-btn) {
    width: 170px;
    height: 60px;
    background-color: #3296fa;
    color: #fff;
  }
  .comments-text {
    width: 50px;
    font-size: 24px;
    input {
      width: 100%;
    }
  }
}

.tabbar-content {
  :deep(.comments-btn) {
    border: 1px solid #a7a7a7 !important;
    height: 44px;
    .van-button__text {
      color: #a7a7a7;
    }
  }
  :deep(.focused-btn) {
    background-color: #fff;
  }
}

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
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
