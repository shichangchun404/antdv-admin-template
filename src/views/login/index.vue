<template>
  <div class="page-login">
    <div class="login-wrap">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item>
          <h3 class="title">账号登录</h3>
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

        <a-form-item
          label=""
          name="password"
          :rules="[{ required: true, message: '请输入密码！' }]"
        >
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
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { notification, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { Md5 } from 'ts-md5'
import { useUserStore } from '@/store/user'
import router from '@/router'
import { PageEnum } from '@/enum/pageEnum'

const userStore = useUserStore()

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
  try {
    const userInfo = await userStore.login(params)
    await router.replace(userInfo?.homePath || PageEnum.BASE_HOME)
    if (userInfo) {
      notification.open({
        message: '登录成功',
        description: `欢迎回来 ${userInfo.username}`
      })
    }
  } catch (error) {
    message.error((error as unknown as Error).message)
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="less">
.page-login {
  position: relative;
  height: 100%;
  background-color: @color-gray-bg;
  overflow: hidden;
  .login-wrap {
    width: 500px;
    height: 250px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid @color-gray-border;
    border-radius: 5px;
    background-color: @color-white;
    .title {
      font-weight: 600;
    }
    .login-form-button {
      width: 100%;
    }
  }
}
</style>
