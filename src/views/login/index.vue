<template>
  <div class="login-wrap">
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item>
        <h3 class="title">登 录</h3>
      </a-form-item>
      <a-form-item
        label=""
        name="username"
        :rules="[{ required: true, message: '请输入用户名！' }]"
      >
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button"> 登 录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/api/api.user'
import { Md5 } from 'ts-md5'
import { setToken } from '@/utils/auth'
import { message } from 'ant-design-vue'

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: 'admin',
  password: '123456'
})

const onFinish = async (userInfo: any) => {
  const { username, password } = userInfo
  const md5: any = new Md5()
  md5.appendAsciiStr(password)
  const cryptPass = md5.end()
  const params = {
    username,
    password: cryptPass
  }
  const data = await login(params)
  if (data.code === 20000) {
    window.location.href = '/home'
    setToken(data.data.token)
  } else {
    // @ts-ignore
    message.error(data.message)
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="less">
.login-wrap {
  width: 500px;
  height: 300px;
  margin: 100px auto;
  padding: 40px;
  border: 1px solid @color-gray-border;
  border-radius: 5px;
  .title {
    font-weight: 600;
  }
  .login-form-button {
    width: 100%;
  }
}
</style>
