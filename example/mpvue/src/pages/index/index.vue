<template>
    <form @submit="onSubmitForm">
        <input type="text" name="username" placeholder="用户名" />
        <input type="number" name="phoneno" placeholder="手机号" />
        <input type="text" name="str" placeholder="长度为3的字符串" />

        <button type="default" form-type="submit">提交</button>
    </form>
</template>

<script>
import WeValidator from 'we-validator'

export default {
  data () {
    return {};
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
            required: true,
            stringLength: 3
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
            required: '请输入字符串',
            stringLength: '字符串长度不对'
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
