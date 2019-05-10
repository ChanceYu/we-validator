<template>
    <form @submit="onSubmitForm">
        <input type="text" v-model="formData.username" name="username" placeholder="用户名" />
        <input type="number" v-model="formData.phoneno" name="phoneno" placeholder="手机号" />
        <input type="text" v-model="formData.str" name="str" placeholder="长度为3的字符串" />

        <button type="primary" :disabled="disabledBtn" form-type="submit">提交</button>
    </form>
</template>

<script>
import WeValidator from 'we-validator'

export default {
  data () {
    return {
      formData: {
        username: '',
        phoneno: '',
        str: '',
      },
      disabledBtn: true
    }
  },

  watch: {
    formData: {
      handler(val, oldVal) {
        /**
         * 全部规则校验通过，按钮才可点击
         */
        // this.disabledBtn = !this.validatorInstance.isValid(val)


        /**
         * 用户名和手机号填写了，按钮才可点击
         */
        const valid = WeValidator.checkValue('required', val.username) && WeValidator.checkValue('required', val.phoneno)

        this.disabledBtn = !valid
      },
      deep: true
    }
  },

  methods: {
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
          username: {
            required: true
          },
          phoneno: {
            required: true,
            mobile: true
          },
          str: {
            length: 3
          }
        },
        messages: {
          username: {
            required: '请输入用户名'
          },
          phoneno: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
          },
          str: {
            length: '请输入长度为3的字符串'
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
