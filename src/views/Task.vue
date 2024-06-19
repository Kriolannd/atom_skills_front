<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import { ref, onMounted, onUpdated, watch } from "vue";
import { useRouter } from "vue-router";
import Card from 'primevue/card';
import { marked } from 'marked';
import { ProductService } from './ProductService';
import { getTask, getTaskStatus, submitAnswer, startTask } from '@/services/taskService';
import type { ITask } from '@/interfaces/submit';
import eventBus from "@/utilities/eventBus";
import { Severity } from "@/utilities/severityEnum";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import { usePrimeVue } from 'primevue/config';
import InputText from 'primevue/inputtext';


const router = useRouter();

window.addEventListener("load", () => {
        console.log("loaded")
        document.getElementsByClassName('p-fileupload-content')[0].appendChild(document.getElementById("comments"))
    });

onMounted(() => {
    someTaskRequest()
    taskStatusRequest()
});

// onUpdated(() => document.getElementsByClassName('p-fileupload-content')[0].appendChild(document.getElementById("comments")))

const products = ref();



let someTaskData = ref<ITask>({
    code: "",
    title: "",
    content: "",
    description: "",
    supplement: [{
        title: "",
        file: ""
    }],
    difficulty: 0,
    time: 0,
    lessons: [{
        code: "",
        title: "",
        traits: [{
            code: "",
            name: "",
            description: ""
        }]
    }]
});

const someTaskRequest = () => {
  let routerParam = router.currentRoute.value.params.code
  getTask(Array.isArray(routerParam) ? routerParam[0] : routerParam).then(
    response => {
    //   console.log(response)
      someTaskData.value = response.data;
    //   console.log(response.data);
    }
  ).catch(
    error => {
      console.log(error)
      eventBus.emit('toast', { severity: Severity.ERROR, summary: 'Ошибка получения данных', detail: 'Неправильно ролучены данные', life: 3000 });
    }
  )
}

let taskStatus = ref();
let timeLeft = ref();

const taskStatusRequest = () => {
  let routerParam = router.currentRoute.value.params.code
  getTaskStatus(Array.isArray(routerParam) ? routerParam[0] : routerParam).then(
    response => {
      taskStatus.value = response.data.status;
      timeLeft.value = Math.floor(response.data.timeLeftMillis / 1000);
      console.log(taskStatus.value);
    }
  )
}

const selectedLesson = ref();
const onRowSelect = () => {
    router.push({name: "lesson", params: {code: selectedLesson.value.code}})
};


const files = ref([])

const onFileSelect = (event) => {
    files.value = event.files
    console.log(files.value)
};

const onFilesUpload = () => {
    submitAnswer({
        id: router.currentRoute.value.params.code,
        files: files.value,
        comments: Array.from(document.getElementById("comments").children).map(input => input.value)
    }).then(taskStatusRequest)
};

const onStartClick = () => {
    startTask(router.currentRoute.value.params.code).then(taskStatusRequest)
}

watch(timeLeft, (newValue, oldValue) => {
    if (newValue > 0) {
        setTimeout(() => timeLeft.value = timeLeft.value - 1, 1000)
    } else {
        taskStatusRequest()
    }
})

</script>

<template>
    <div class="task-container">
        <div class="lesson-sidebar">
            <DataTable id="d3" v-model:selection="selectedLesson" :value="someTaskData.lessons" selectionMode="single" paginator :rows="5" dataKey="code" @rowSelect="onRowSelect">
                <Column field="title" header="Учебные материалы к заданию" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.title }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="main-c">
            <div class="title-card">
                <Card style="overflow: hidden">
                    <template #title>{{ someTaskData.title }}</template>
                    <template #content></template>
                </Card>
                <Button v-if="taskStatus == null" label="Взять в работу" @click="onStartClick"/>
                <Button v-if="taskStatus == 'IN_PROGRESS'" label="В работе" severity="danger" disabled/>
                <template v-if="taskStatus == 'IN_PROGRESS'">{{ timeLeft }}</template>
                <Button v-if="taskStatus == 'ON_REVIEW'" label="На проверке" severity="warn" disabled/>
                <Button v-if="taskStatus == 'REVIEWED'" label="Проверено" severity="info" disabled/>
            </div>
            <div class="article-card">
                <ScrollPanel style="width: 100%; height: 100%">
                    <div v-html="marked.parse(someTaskData.content.replaceAll('<br>', '\n'))"></div>
                    <!-- <div id="md" v-html="marked.parse(originalStr)"></div> -->
                </ScrollPanel>
            </div>
            <FileUpload v-if="taskStatus == 'IN_PROGRESS'" customUpload @select="onFileSelect($event)" @uploader="onFilesUpload()" :multiple="true" accept="image/*" :maxFileSize="10000000">
                <template #empty>
                    <span>Перетащите изображения для загрузки</span>
                </template>
            </FileUpload>
            <div id="comments">
                <InputText v-for="file of files" placeholder="Комментарий"/>
            </div>
        </div>
        <Button id="b11" icon="pi pi-arrow-left" rounded raised @click="router.push('/tasks')" />
    </div>

</template>

<style>

#b11 {
    position: fixed;
    top: 0.5vh;
    left: 1%;
    z-index: 1;
}

#d3 {
    height: 100vh;
    margin-top: 5vh;
    margin-right: 15%
}

.task-container {
    display: flex;
    flex-direction: row;
}
.article-card {
    background: rgb(255, 255, 253);
    border: 2px solid rgb(223, 226, 226);
    height: 65vh;
    border-radius: 10px;
    padding: 2rem;
}

.title-card {
    margin-bottom: 10px;
    border: 2px solid rgb(223, 226, 226);
    border-radius: 10px;
}

.main-c {
    display: flex;
    flex-direction: column;
    width: 80%;
    flex: 1 1 66.666%;
}

.lesson-sidebar {
    height: 40vh;
    flex: 1 1 33.333%;
}

.p-dataview {
    border: solid 2px rgb(223, 226, 226);
    border-radius: 10px;
}

.lesson-sidebar-header {
    font-size: 25px;
}
</style>