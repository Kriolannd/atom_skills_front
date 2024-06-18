<script lang="ts" setup>
import InputText from 'primevue/inputtext';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted } from 'vue';
import Button from "primevue/button";

import {useRouter} from "vue-router";
import { getAllLessons } from '@/services/lessonService';

const router = useRouter()

const lessons = ref();
const filters = ref({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    author: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const loading = ref(true);

const selectedLesson = ref();
const onRowSelect = () => {
    router.push({name: "lesson", params: {code: selectedLesson.value.code}})
};

onMounted(() => {
    getAllLessons().then(response => {
      console.log(response.data)
      lessons.value = response.data;
      loading.value = false;
    })
});


</script>

<template>
  <DataTable id="d1" v-model:selection="selectedLesson" v-model:filters="filters" :value="lessons" selectionMode="single" paginator :rows="5" dataKey="code" filterDisplay="row" :loading="loading" @rowSelect="onRowSelect" >
    <template #empty> Уроков не найдено. </template>
    <template #loading> Происходит загрузка уроков. Пожалуйста подождите. </template>
    <Column field="title" header="Название" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.title }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
        </template>
    </Column>

    <Column field="author" header="Автор" dataType="text" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.author }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" />
        </template>
    </Column>
    <Button id="b1" icon="pi pi-refresh" rounded raised @click="router.push('add')" />
  </DataTable>
</template>

<style>
    #b1 {
        position: fixed;
        top: 0.5vh;
        right: 1%;
        z-index: 1;
    }

    .p-datatable, #d1 {
        height: 100vh;
        width: 100%;
    }

  /* .right-side,
  .left-side {
    display: flex;
    flex: 1 1 1;
  }

  .under-side {
    flex: 100%;
    order: 3;
    margin-top: 150px;
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .right-side {
    background-color: lightgrey;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    flex: 1 1 0;
    justify-content: space-around;
  }

  .left-side {
    background-color: lightblue;
    border-radius: 10px;
    padding: 10px;
    margin-right: 15px;
  }

  .main-ul {
    flex-direction: column;
  }

  .main-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  } */

  /* body {
    font-family: var(--font-family);
    font-weight: normal;
    background: var(--surface-ground);
    color: var(--text-color);
    padding: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  } */

  /* .card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
} */

  /* p {
      line-height: 1.75;
  }

  nav {
   display: block;
   top: auto;
   position: relative;
   background-color: white;
  }

  .custom-tab-menu {
    display: flex;
    justify-content: center;
    background-color: #f4f4f4;
    padding: 10px;
  }

  .tabmenu-list {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  .tabmenu-list li {
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .tabmenu-list li.active {
    background-color: #007ad9;
    color: #fff;
  }

  .tabmenu-list li i {
    margin-right: 5px;
  }

  .tabmenu-list li:hover {
    background-color: #007ad9;
    color: #fff;
  } */
  
</style>
