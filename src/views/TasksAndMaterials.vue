<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { ref } from "vue";

const visible = ref(false);

</script>

<template>
    <div class="card flex justify-center">
        <Sidebar v-model:visible="visible" header="Sidebar">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Sidebar>
        <Button icon="pi pi-arrow-right" @click="visible = true" />
    </div>
    <p>skaopsa[kp[pxak]]</p>
</template>

<style>

</style>
