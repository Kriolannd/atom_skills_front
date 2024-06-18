<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {submitRequest} from "@/utilities/submitRequest";
import type {IAuthorizeData} from "@/interfaces/submit";
import eventBus from "@/utilities/eventBus";
import { Severity } from "@/utilities/severityEnum";

const router = useRouter();

const loginformData = ref<IAuthorizeData>({
  username: "",
  password: ""
})

const loginRequest = () => {
  submitRequest("post", "auth/login", loginformData.value,
    response => {
      console.log(response)
      localStorage.setItem("token", response.data.token);
      router.push("/topics")
    },
    error => {
      console.log(error)
      eventBus.emit('toast', { severity: Severity.ERROR, summary: 'Ошибка входа', detail: 'Неправильно введенные логин/пароль', life: 3000 });
    }
  )
}

</script>

<template>
  <div class="shadow-2xl rounded-lg p-5 max-w-[25rem] w-full">
    <p class="text-4xl mb-4 text-center text-green-800">Авторизация</p>
    <form @submit.prevent>
      <div class="flex flex-col gap-4 mb-4">
        <div class="flex flex-col gap-1">
          <label
              class="text-xs text-green-800"
              for="username">
            Логин
          </label>
          <InputText
              id="username"
              v-model="loginformData.username"
              class="text-sm"
              placeholder="Введите логин"
              required/>
        </div>
        <div class="flex flex-col gap-1">
          <label
              class="text-xs text-green-800"
              for="password">
            Пароль
          </label>
          <Password
              id="password"
              v-model="loginformData.password"
              input-class="grow pr-0 text-sm"
              placeholder="Введите пароль"
              required
              toggle-mask
              :feedback="false"/>
        </div>
        <Button
            :disabled="!loginformData.username || !loginformData.password"
            class="flex justify-center items-center"
            type="submit"
            @click="loginRequest">
          Войти
        </Button>
      </div>
      <span class="text-sm">Еще не зарегистрированы?</span>
      <Button
          class="pb-0"
          label="Зарегистрироваться сейчас"
          link
          size="small"
          @click="router.push('/register')"/>
    </form>
  </div>
</template>

