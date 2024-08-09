<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" v-model="mobile" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ second === totalSecond ? "获取验证码" : second + "秒后重新" }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login()">登录</div>
    </div>
  </div>
</template>

<script>
import {codeLogin, getMsgCode, getPicCode} from '@/api/login'


export default {
  name: 'LoginIndex',
  data() {
    return {
      picCode: '', //用户输入的验证码
      picKey: '', //请求传递的图片验证码的唯一标识
      picUrl: '', //图片的地址
      totalSecond: 60,//总秒数
      second: 60,//当前秒数
      timer: null,
      mobile: '',
      msgCode: ''
    }
  },
  created() {
    this.getPicCode()
  },
  methods: {
    async getPicCode() {
      const {data: {base64, key}} = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },

    //校验手机号和验证码是否合法
    validFn() {
      if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.mobile)) {
        this.$toast("请输入正确的手机号码")
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },

    //获取短信验证码
    getCode() {
      if (!this.validFn()) {
        //校验失败
        return
      }

      // 当前没有定时器开着，并且totalSecond和second一致，才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取短信验证码
        // 预期：如果响应的status不是200，最好抛出一个错误，只会等待成功的promise
        getMsgCode(this.picCode, this.picKey, this.mobile).then(() => {
          this.$toast('发送成功，请注意查收')
        })

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },

    login() {
      //校验手机号，图形验证码
      if (!this.validFn()) {
        return
      }

      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }

      codeLogin(this.mobile, this.msgCode).then((res) => {
        console.log(res.data)
        this.$toast('登录成功')
        this.$router.push('/')
      })
    }
  },
}

</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
