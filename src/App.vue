<script lang="ts" setup>
import {RouterView, useRouter} from 'vue-router'
import { onMounted, getCurrentInstance, onBeforeUnmount } from 'vue';
import Toast from 'primevue/toast';
import eventBus from './utilities/eventBus';
import { Severity } from './utilities/severityEnum';

const router = useRouter();
const { proxy } = getCurrentInstance()!;

onMounted(() => {
  router.push("/add")
  if (proxy) {
    eventBus.on('toast', showToast);
  }
})

onBeforeUnmount(() => {
  if (proxy) {
    eventBus.off('toast', showToast);
  }
});

const showToast = (
  {severity, summary, detail, life}: { 
    severity: Severity, 
    summary: string, 
    detail: string, 
    life: number }
  ) => {
  if (proxy) {
      proxy.$toast.add({severity, summary, detail, life});
  }
}

</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen p-4 img-container">
    <Toast />
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="slide">
        <component
            :is="Component"
            :key="$route.path"/>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity .5s, transform .5s;
  }

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  }
</style>
