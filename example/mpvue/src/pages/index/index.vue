<template>
    <form @submit="onSubmitForm">
        <input type="number" v-model="formData.phoneno" name="phoneno" placeholder="手机号" />
        
        <view class="extra-box">
          <input type="text" v-model="formData.code" name="code" placeholder="验证码" />
          <button type="primary" size="mini" @click="onClickSend">发送</button>
        </view>
        
        <input type="text" v-model="formData.username" name="username" placeholder="姓名（可选）" />

        <button type="primary" :disabled="disabledSubmitBtn" form-type="submit">提交</button>
    </form>
</template>

<script>
import WeValidator from 'we-validator'

export default {
  data () {
    return {
      formData: {
        phoneno: '',
        code: '',
        username: ''
      },
      disabledSubmitBtn: true // 提交按钮禁用状态
    }
  },

  watch: {
    formData: {
      handler(val, oldVal) {
        /**
         * 全部规则校验通过，提交按钮才可点击
         */
        // this.disabledSubmitBtn = !this.validatorInstance.isValid(val)

        /**
         * 手机号和验证码填写了，提交按钮才可点击
         */
        this.disabledSubmitBtn = !this.validatorInstance.isValid(val, ['phoneno:required', 'code:required'])
      },
      deep: true
    }
  },

  methods: {
    onClickSend(){
      // 这里只校验手机号对应规则
      if (!this.validatorInstance.checkFields(this.formData, ['phoneno'])) return;
      
      console.log('开始发送验证码');
    },
    
    onSubmitForm (e) {
      let { value } = e.target;

      console.log(value);
      if (!this.validatorInstance.checkData(value)) return;

      // 开始提交表单
      // wx.request
      console.log('submiting');
    },

    initValidator () {
      this.validatorInstance = new WeValidator({
        rules: {
          phoneno: {
            required: true,
            mobile: true
          },
          code: {
            required: true
          },
          username: {
            rangeChinese: [2,8]
          }
        },
        messages: {
          phoneno: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
          },
          code: {
            required: '请输入验证码'
          },
          username: {
            rangeChinese: '姓名只能输入 {0} - {1} 位汉字'
          }
        }
      });
    }
  },

  mounted () {
      this.initValidator()
  }
};
</script>

<style scoped>
/* .extra-box::after{
  content: '';
  clear: both;
  display: block;
} */
.extra-box{
  display: flex;
  align-items: center;
}
.extra-box input{
  width: 60%;
  flex: 1;
}
.extra-box button{
  padding: 4px 20px;
  font-size: 12px;
}

input{
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
  font-size: 16px;
}

button{
  margin: 10px;
}
</style>
