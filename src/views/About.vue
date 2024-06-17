<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { ref } from "vue";
import Button from "primevue/button";
import Listbox from 'primevue/listbox';
import VirtualScroller from 'primevue/virtualscroller';



const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const visible = ref(false);

</script>

<template>
    <div class="card flex justify-center about-div">
        <Sidebar v-model:visible="visible" header="Sidebar">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Sidebar>
        <Button icon="pi pi-arrow-right" @click="visible = true" />
    </div>
    <div class="card flex justify-center">
        <Listbox v-model="selectedCity" :options="cities" filter optionLabel="name" class="w-full md:w-[14rem]" />
    </div>
    <VirtualScroller :items="cities" :itemSize="50" class="border border-surface-300 dark:border-surface-700 rounded-md" style="width: 200px; height: 200px">
        <div class="card flex justify-center">
            <Listbox v-model="selectedCity" :options="cities" filter optionLabel="name" class="w-full md:w-[14rem]" :virtualScrollerOptions="{ itemSize: 18 }" />
        </div>
    </VirtualScroller>
    <div class="card flex justify-center">
        <VirtualScroller :items="cities" :itemSize="50" filter class="border border-surface-300 dark:border-surface-700 rounded-md" style="width: 200px; height: 200px">
            <template v-slot:item="{ item, options }">
                <div :class="['flex items-center p-2', { 'bg-surface-100 dark:bg-surface-700': options.odd }]" style="height: 50px">{{ item }}</div>
            </template>
        </VirtualScroller>
    </div>
</template>

<style>
.about-div {
    position: fixed;
    top: 5vh;
    left: 5%;
}
</style>