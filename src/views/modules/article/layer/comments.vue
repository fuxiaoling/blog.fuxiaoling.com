<style lang="stylus" scoped>
@import './../../../../assets/stylus/variable.stylus'
.article-comments
  background #fff
  border-radius 5px
  padding 30px
.comments-form-header
  line-height 36px
  .comments-title
    font-size 18px
    font-weight 700
    span
      padding-left 10px
      font-size 16px
      color $hoverColor
  .avatar
    height 36px
    width 36px
    border-radius 50%
.comments-form
  /deep/ .ant-form-item
    width 100%
  /deep/ .ant-form-item-control-wrapper
    width 100%
  /deep/ .ant-form-item-with-help
    margin-bottom 0
  /deep/ .has-error
    position relative
  /deep/ .ant-form-explain
    position absolute
    left 0
    bottom -20px
  /deep/ input,
  /deep/ .ant-input,
  /deep/ textarea
    margin-top 20px
    // background $backgroundColor
    border-color #ededed
    color $color
  /deep/ input
    height 40px
  /deep/ .ant-input-prefix
    top 66%
  /deep/ button
    text-align right
.comments-items
  margin-top 60px
  .comments-item-box
    width 100%
    position relative
  .item-avatar
    position absolute
    top 0
    left 0
    .avatar
      height 36px
      width 36px
      border-radius 50%
  .item-content
    width 100%
    border-bottom 1px solid #ededed
    padding-left 50px
    margin-bottom 15px
    .item-content
      border-bottom none
      margin-bottom 0
    .comment-nickname
      line-height 20px
      color $hoverColor
      span
        padding-left 10px
        color $grayColor
    .comment-time
      line-height 16px
      color $grayColor
    .comment-content
      padding 15px 0
</style>
<template>
  <div class="article-comments mt15">
    <div class="comments-form-header clearfix">
      <div class="comments-title fl"><a-icon type="message" :style="{'margin-right': '8px'}" />
        评论
        <a-icon v-if="this.comments === null" type="loading" />
        <span v-else>{{this.comments.length}}</span>
      </div>
      <div class="comments-avatar fr">
        <img alt="" data-src="https://cdn.v2ex.com/gravatar/?s=50&amp;d=mm&amp;r=g" srcset="https://cdn.v2ex.com/gravatar/?s=100&amp;d=mm&amp;r=g 2x" class="avatar" height="36" width="36" src="https://cdn.v2ex.com/gravatar/?s=50&amp;d=mm&amp;r=g">
      </div>
    </div>
    <!-- 评论框 | 开始-->
    <a-form class="comments-form clearfix" layout="inline" :form="form" @submit="handleFormSubmit">
      <a-row :gutter="32">
        <a-col :span="12">
          <a-form-item>
            <a-input v-decorator="[ 'author_name', { rules: [{ required: false }] } ]" placeholder="昵称">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item>
            <a-input v-decorator="[ 'author_email', { rules: [{ required: false }] } ]" placeholder="邮箱">
              <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item>
            <a-textarea :rows="4" v-decorator="[ 'content', { rules: [{ required: false }] } ]" placeholder="欢迎发表您的评论。请勿提交无意义的内容，您的留言将在博主审核通过后显示。" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button class="mt15 fr" type="primary" html-type="submit" :disabled="disabled"> 提交评论 </a-button>
    </a-form>
    <!-- 评论框 | 结束-->
    <div class="comments-items mt15">
      <!-- 游客评论 | 开始-->
      <div class="comments-item-box clearfix" v-for="comment in comments" :key="comment.id">
        <template v-if="comment.parent === 0">
          <div class="item-avatar">
            <img src="https://cdn.v2ex.com/gravatar/?s=50&amp;d=mm&amp;r=g"
              srcset="https://cdn.v2ex.com/gravatar/?s=100&amp;d=mm&amp;r=g 2x" class="avatar" height="42" width="42">
          </div>
          <div class="item-content">
            <div class="comment-nickname">{{comment.author_name}}<span>评论：</span></div>
            <div class="comment-time">{{comment.date.replace('T', ' ')}}</div>
            <div class="comment-content" v-html="comment.content.rendered"></div>
            <!--管理员回复 | 开始-->
            <template v-if="comment.replies.length > 0">
              <div class="comments-item-box clearfix" v-for="replyComment in comment.replies" :key="replyComment.id">
                <template v-if="comment.id === replyComment.parent">
                  <div class="item-avatar fl">
                    <img src="https://cdn.v2ex.com/gravatar/?s=50&amp;d=mm&amp;r=g"
                      srcset="https://cdn.v2ex.com/gravatar/?s=100&amp;d=mm&amp;r=g 2x" class="avatar" height="42" width="42">
                  </div>
                  <div class="item-content fl">
                    <div class="comment-nickname">{{replyComment.author_name}}<span>回复：</span></div>
                    <div class="comment-time">{{replyComment.date.replace('T', ' ')}}</div>
                    <div class="comment-content" v-html="replyComment.content.rendered"></div>
                  </div>
                </template>
              </div>
            </template>
            <!--管理员回复 | 结束-->
          </div>
        </template>
      </div>
      <!-- 游客评论 | 结束-->
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: null,
      form: this.$form.createForm(this, { name: 'comment_form' }),
      disabled: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions([
      'article/GetComments',
      'article/PostComments'
    ]),
    init () {
      this.formInit(),
      this.getComments()
    },
    formInit () {
      this.form = this.$form.createForm(this, {
        onFieldsChange: () => {
          const { getFieldValue } = this.form
          const nickname = getFieldValue('author_name')
          const email = getFieldValue('author_email')
          const content = getFieldValue('content')
          if (nickname && email && content) {
            this.disabled = !(nickname.trim()) || !(email.trim()) || !(content.trim())
          } else {
            this.disabled = true
          }
        }
      })
    },
    handleFormSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        const { author_name, author_email, content } = values
        const nickname = this.unexistSpecialCharacters(author_name, false, '昵称') && this.isSaveLength(author_name, 50, '昵称')
        const email = nickname && this.unexistSpecialCharacters(author_email, true, '邮箱') && this.isEmail(author_email) && this.isSaveLength(author_email, 100, '邮箱')
        const contents = email && this.unexistSpecialCharacters(content, false, '留言') && this.isSaveLength(content, 600, '留言')
        if (!err && nickname && email && contents) {
          this.postComments(Object.assign(values, {
            post: this.postId,
            author: 2
          }))
        }
      })
    },
    isSaveLength (value, length, obj) {
      if (value.length > length) {
        this.$message.error(`${obj}的长度不能大于${length}`)
        return false
      } else {
        return true
      }
    },
    isEmail (value) {
      const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
      if (!reg.test(value)) {
        this.$message.error('邮箱格式不正确')
        return false
      } else {
        return true
      }
    },
    unexistSpecialCharacters (value, isEmail = false, obj) {
      const reg = isEmail ? /[!$^|*<>%;)(&+]/ : /[!@$^|*<>%;)(&+]/
      if (reg.test(value)) {
        this.$message.error(`${obj}包含特殊字符`)
        return false
      } else {
        return true
      }
    },
    getComments () {
      const { postId } = this
      this['article/GetComments']({ params: { post: postId } }).then(list => {
        const comments = this.partitionComments(list)
        this.comments = comments
        this.$emit('commentsLength', comments.length)
      }).catch(err => {
        throw new Error('获取文章评论数据出错', err)
      })
    },
    partitionComments (list) {
      const comments = []
      const replyComments = []
      for (let item of list) {
        if (item.parent === 0) {
          comments.push(this.fixComment(item))
        } else {
          replyComments.push(this.fixComment(item))
        }
      }
      if (replyComments.length > 0) {
        comments.forEach(comment => {
          comment.replies = replyComments.filter(item => item.parent === comment.id)
        })
      }
      return comments
    },
    fixComment (comment) {
      let text = comment.content.rendered
      const matchs = text.match(/(<\/?a.*?>)/gi)
      if (matchs && matchs.length > 0) {
        text = text.replace('@', ``)
        for (let [index, replaceStr] of matchs.entries()) {
          text = text.replace(replaceStr, `${index % 2 === 0 ? '<span style="display:none">' : '</span>'}`)
        }
      }
      comment.content.rendered = text
      return comment
    },
    postComments (params) {
      this['article/PostComments']({ params }).then(() => {
        this.$message.success('评论已提交，请等待审核通过')
        this.form.setFieldsValue({
          author_name: ``,
          author_email: ``,
          content: ``
        })
      }).catch(err => {
        throw new Error('提交文章评论出错', err)
      })
    }
  }
}
</script>