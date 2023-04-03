<template>
  <a-form
    class="login-wrap"
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <!-- <a-input v-model:value="formState.username" placeholder="用户名" class="input">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>

    <a-input-password v-model:value="formState.password" placeholder="密 码" class="input">
      <template #prefix>
        <LockOutlined />
      </template>
    </a-input-password>

    <a-button type="primary" block @clcik="loginHandler">登 录</a-button> -->


    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: '请输入用户名' }]"
    >
      <a-input v-model:value="formState.username" placeholder="请输入用户名"/>
    </a-form-item>

    <a-form-item
      label="密 码"
      name="password"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formState.password" placeholder="请输入密码"/>
    </a-form-item>


    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>


  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { login } from '@/api/api.user'
import { Md5 } from 'ts-md5';
import { setToken } from '@/utils/auth'
import { message } from 'ant-design-vue';

interface FormState {
  username: string;
  password: string;
}

type LoginResponse = {
  code: number
  message: string
  data?: object

}

const formState = reactive<FormState>({
  username: '',
  password: '',
});

const onFinish = async(userInfo: any) => {
  console.log('Success:', userInfo);
  const { username, password } = userInfo
  const md5:any = new Md5()
  md5.appendAsciiStr(password)
  const cryptPass = md5.end()
  const params = {
    username,
    password: cryptPass
  }
  const data = await login(params)
  // @ts-ignore
  if(data.code === 20000){
    window.location.href = '/home'
    setToken(data.data.token)
  }else{
    // @ts-ignore
    message.error(data.message);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

</script>

<style lang="less">
.login-wrap{
  width: 300px;
  height: 200px;
  margin: 100px auto;
  .input{
    margin-bottom: 10px;
  }
}
</style>
