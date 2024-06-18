<script lang="ts" setup>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import {computed, ref, type UnwrapRef} from "vue";
import type {IRegisterData} from "@/interfaces/submit";
import {useRouter} from "vue-router";
import {submitRequest} from "@/utilities/submitRequest";
import eventBus from "@/utilities/eventBus";
import { Severity } from "@/utilities/severityEnum";

const router = useRouter()

const registerformData = ref<UnwrapRef<IRegisterData>>({
  username: "",
  email: "",
  password: ""
})

const isValidEmail = computed<boolean>(() => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (registerformData.value.email)
    return re.test(registerformData.value.email);
  return false
});

const isSubmitButtonDisabled = computed(() => {
  const {username, email, password} = registerformData.value;
  return !username || !email || !password || !isValidEmail.value
});

const registerRequest = () => {
  submitRequest("post", "auth/signup", registerformData.value,
    response => {
      console.log(response)
      eventBus.emit('toast', { severity: Severity.SUCCESS, summary: 'ОК', detail: 'Регистрация прошла успешно', life: 3000 });
      router.push("/login")
    },
    error => {
      console.log(error)
      eventBus.emit('toast', { severity: Severity.ERROR, summary: 'Ошибка', detail: 'Ошибка', life: 3000 });
    }
  )
}

</script>

<template>
  <div class="shadow-2xl rounded-lg p-5 max-w-[25rem] w-full">
    <p class="text-4xl mb-4 text-center text-green-800">Регистрация</p>
    <form @submit.prevent>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label
              class="text-xs text-green-800"
              for="username">
            Логин
          </label>
          <InputText
              id="username"
              v-model="registerformData.username"
              class="text-sm"
              placeholder="Введите логин"
              required/>
        </div>
        <div class="flex flex-col gap-1">
          <label
              class="text-xs text-green-800"
              for="email">
            Электронная почта
          </label>
          <InputText
              id="email"
              v-model="registerformData.email"
              class="text-sm"
              placeholder="example@domain.com"
              required/>
          <span
              v-if="registerformData.email && !isValidEmail"
              class="text-red-500 text-xs">
            Неправильный формат
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <label
              class="text-xs text-green-800"
              for="password">
            Пароль
          </label>
          <Password
              id="password"
              v-model="registerformData.password"
              input-class="grow pr-0 text-sm"
              placeholder="Введите пароль"
              required
              toggle-mask/>
        </div>
        <Button
            :disabled="isSubmitButtonDisabled"
            class="flex justify-center items-center"
            type="submit"
            @click="registerRequest">
          Зарегистрироваться
        </Button>
      </div>
      <span class="text-sm">Уже зарегистрированы?</span>
      <Button
          class="pb-0"
          label="Войти"
          link
          size="small"
          @click="router.push('/login')"/>
    </form>
  </div>
</template>
