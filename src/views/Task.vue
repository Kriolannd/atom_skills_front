<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import { ref, onMounted, onUpdated, watch } from "vue";
import { useRouter } from "vue-router";
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
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
import Badge from 'primevue/badge';
import Panel from 'primevue/panel';
import { usePrimeVue } from 'primevue/config';
import InputText from 'primevue/inputtext';


const router = useRouter();

window.addEventListener("load", () => {
        console.log("loaded")
        document.getElementsByClassName('p-fileupload-content')[0].appendChild(document.getElementById("comments"))
    });

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 3)));
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
const onRowSelect = (event) => {
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
        <div class="sidebar">
        <div class="lesson-sidebar">
            <!-- <DataView dataKey="value" :value="someTaskData.lessons" paginator :rows="3">
                <template #header><p class="lesson-sidebar-header">Учебные материалы</p></template>
                <template #list="slotProps">
                    <div class="flex flex-col">
                        <div v-for="(item, index) in slotProps.items" :key="index">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }" selected>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <div class="text-lg font-medium mt-2">{{ item.title }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView> -->
            <DataTable v-model:selection="selectedLesson" :value="someTaskData.lessons" selectionMode="single" paginator :rows="5" dataKey="code" @rowSelect="onRowSelect">
                <Column field="title" header="Учебные материалы к заданию" style="min-width: 12rem">
                    <template #body="{ data }">
                        {{ data.title }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="result-sidebar">
            <Panel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <span class="font-bold">Денис Пешехонов</span>
                    </div>
                </template>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Panel>
        </div>
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
                <!-- <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                    <div class="flex flex-col gap-8 pt-4">
                        <div v-if="files.length > 0">
                            <h5>Pending</h5>
                            <div class="flex flex-wrap gap-4">
                                <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                    <div>
                                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                    </div>
                                    <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    <Badge value="Pending" severity="warn" />
                                    <Button icon="pi pi-times" outlined rounded severity="danger" />
                                </div>
                            </div>
                        </div>

                        <div v-if="uploadedFiles.length > 0">
                            <h5>Completed</h5>
                            <div class="flex flex-wrap gap-4">
                                <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                    <div>
                                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                    </div>
                                    <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    <Badge value="Completed" class="mt-4" severity="success" />
                                    <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template> -->
            </FileUpload>
            <div id="comments">
                <InputText v-for="file of files" placeholder="Комментарий"/>
            </div>
        </div>
    </div>

</template>

<style>

.task-button-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* display: flex;
    background-color: lightgrey;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    flex: 1 1 0;
    justify-content: space-around; */
}
.task-container {
    display: flex;
    flex-direction: row;
}
.article-card {
    background: rgb(255, 255, 253);
    border: 2px solid rgb(223, 226, 226);
    /* width: 140vh; */
    height: 65vh;
    border-radius: 10px;
    padding: 2rem;
    /* margin-bottom: 1rem; */
    /* max-width: 75% */
    /* margin-top: 200px;
    position: absolute;
    top: 1vh;
    right: 20px; */
    /* flex: 0 0 70% */
}

.title-card {
    /* width: 140vh; */
    /* height: 25vh; */
    /* max-width: 75%; */
    /* position: fixed; */
    /* top: 30px;
    right: 20px; */
    /* flex: 0 0 70% */
    margin-bottom: 10px;
    border: 2px solid rgb(223, 226, 226);
    border-radius: 10px;
}

.main-c {
    display: flex;
    flex-direction: column;
    /* max-width: 75%; */
    width: 70vw
}

.p-card {
    /* border-radius: 10px; */
    /* height: 16vh;
    width: 140vh; */
    /* border: solid 2px rgb(223, 226, 226);
    height: 16vh; */
}

.lesson-sidebar {
    /* width: 50vh; */
    height: 50vh;
    /* position: fixed;
    left: 20px;
    top: 30px; */
    /* flex: 0 0 30% */
    max-width: 80%;
}

.result-sidebar {
    /* width: 50vh;
    height: 43vh;
    position: fixed;
    left: 20px;
    top: 520px; */
    border: solid 2px rgb(223, 226, 226);
    border-radius: 10px;
    height: 40vh;
    /* flex: 0 0 30% */
    max-width: 80%;
}

.p-dataview {
    border: solid 2px rgb(223, 226, 226);
    border-radius: 10px;
}

.sidebar {
    display: flex;
    flex-direction: column;
    max-width: fit-content;
    width: 30vw;
}

.lesson-sidebar-header {
    font-size: 25px;
}
</style>