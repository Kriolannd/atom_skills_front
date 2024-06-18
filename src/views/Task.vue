<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from 'primevue/card';
import { marked } from 'marked';
import { getTask } from '@/services/taskService';
import type { ITask } from '@/interfaces/submit';
import eventBus from "@/utilities/eventBus";
import { Severity } from "@/utilities/severityEnum";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import { usePrimeVue } from 'primevue/config';


const router = useRouter();


onMounted(() => {
    someTaskRequest()
});

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

const selectedLesson = ref();
const onRowSelect = () => {
    router.push({name: "lesson", params: {code: selectedLesson.value.code}})
};

const $primevue = usePrimeVue();
const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

const files = ref([])
const onAdvancedUpload = (event: any) => {
    files.value = event.files
    console.log(files.value)
};

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
            </div>
            <div class="article-card">
                <ScrollPanel style="width: 100%; height: 100%">
                    <div v-html="marked.parse(someTaskData.content.replaceAll('<br>', '\n'))"></div>
                    <!-- <div id="md" v-html="marked.parse(originalStr)"></div> -->
                </ScrollPanel>
            </div>
            <FileUpload name="demo[]" url="/api/upload" @select="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                </template>
            </FileUpload>
            <div v-for="file of files">{{ file }}</div>
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