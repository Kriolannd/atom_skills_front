<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { getAllLessons } from '@/services/lessonService';
import { getAllTasks } from '@/services/taskService';

import InputText from 'primevue/inputtext';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import Rating from 'primevue/rating';
import Button from "primevue/button";

import {useRouter} from "vue-router";


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

const tasks = ref();
const filters1 = ref({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    difficulty: { value: null, matchMode: FilterMatchMode.EQUALS },
    time: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const selectedTask = ref();
const onRowSelect1 = () => {
    router.push({name: "task", params: {code: selectedTask.value.code}})
};


onMounted(() => {
    getAllLessons().then(response => {
      lessons.value = response.data;
      loading.value = false;
    })

    getAllTasks().then(response => {
      tasks.value = response.data;
      loading.value = false;
    })
});

</script>

<template>
    <div class="card" id="c1">
        <Splitter style="height: 100vh" layout="vertical">
            <SplitterPanel class="flex items-center justify-center">
                <DataTable id="d2" v-model:selection="selectedLesson" v-model:filters="filters" :value="lessons" selectionMode="single" paginator :rows="5" dataKey="code" filterDisplay="row" :loading="loading" @rowSelect="onRowSelect" >
                    <template #header>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-xl font-bold">Учебные материалы</span>
                            <Button icon="pi pi-refresh" rounded raised @click="router.push('add')" />
                        </div>
                    </template>
                    <template #empty> Учебных материалов не найдено. </template>
                    <template #loading> Происходит загрузка учебных материалов. Пожалуйста подождите. </template>
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
                </DataTable>
            </SplitterPanel>

            <SplitterPanel class="flex items-center justify-center"> 
                <DataTable id="d2" v-model:selection="selectedTask" v-model:filters="filters1" :value="tasks" selectionMode="single" paginator :rows="5" dataKey="code" filterDisplay="row" :loading="loading" @rowSelect="onRowSelect1" >
                    <template #header>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <span class="text-xl font-bold">Задания</span>
                        </div>
                    </template>
                    <template #empty> Заданий не найдено. </template>
                    <template #loading> Происходит загрузка заданий. Пожалуйста подождите. </template>
                    <Column field="title" header="Название" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.title }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  />
                        </template>
                    </Column>
                    <Column field="difficulty" header="Сложность" dataType="numeric" style="min-width: 12rem">
                        <template #body="{ data }">
                        <Rating :modelValue="data.difficulty" readonly :cancel="false" />
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="time" header="Время на выполнение" dataType="numeric" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.time }} мин
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </SplitterPanel>
        </Splitter>
    </div>
</template>

<style>
    #c1 {
        width: 100%;
        height: 100vh;
    }
    
    #d2 {
        height: 100vh;
        width: 100%;
        margin-top: 50vh;
    }
</style>
