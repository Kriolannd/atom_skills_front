<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Card from 'primevue/card';
import Button from "primevue/button";
import type { ITopicCard } from '@/interfaces/submit';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import { getAllTopics } from "../services/topicService"
import InputIcon from 'primevue/inputicon';
import IconField from 'primevue/iconfield';

const cardData = ref<ITopicCard[]>([]);

const router = useRouter();

const redirectToTask = (code: string): void => {
    try {
        router.push({name: "task", params: {code: code}}); 
    } catch (error) {
        console.error(error);
    }
}

const redirectTo = (path: string): void => {
    try {
        router.push({name: path}); 
    } catch (error) {
        console.error(error);
    }
}

let searchText = " ";

let filterCards: ITopicCard[] = []

onMounted(() => {
    getAllTopics().then(response => {
        console.log(response.data)
        cardData.value = response.data
    })
    filteredCardData()
})
 

// const filteredCardData = (): ICardData[] => {
//         searchText = filters.global.value.toLowerCase();
//         return cardData.value.filter(data => data.description.toLowerCase().includes(searchText));
// }

// onMounted(() => {
//     filteredCardData()
// });

const filteredCardData = (): void => {
    filterCards = cardData.value.filter(item => {
        return JSON.stringify(item.title).toLowerCase().includes(searchText.toLowerCase())
    })
}


</script>

<template>
<div class="add-add-container">
    <div class="add-container">
        <div class="right-side">
            <div class="card flex justify-center flex-wrap gap-4">
                <Button label="Все материалы" severity="success" raised @click="redirectTo('lessons')" />
                <Button label="Все задания" severity="success" raised @click="redirectTo('tasks')" />
                <Button icon="pi pi-refresh" rounded raised @click="router.push('login')" />
            </div>
            <div class="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText placeholder="Keyword Search" v-model="searchText" @input="filteredCardData()" />
                </IconField>
            </div>
        </div>
    </div>

    <div class="container">
        <Card style="width: 25rem; overflow: hidden" v-for="data in cardData">
            <template #title>{{ data.title }}</template>
            <template #content>
                <p class="m-0">
                    {{ data.description }}
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" outlined class="w-full" @click="router.push('tasksandmaterials')" />
                    <Button label="Задание" class="w-full" @click="redirectToTask(data.code)" />
                </div>
            </template>
        </Card>
    </div>
</div>
</template>

<style>
    .add-add-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    max-height: 100vh;
    margin-top: 15vh;
    }

    .add-container {
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    width: 100%;
    }

    .right-side {
    width: 100%;
    display: flex;
    background-color: lightgrey;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    flex: 1 1 0;
    justify-content: center;
    }

    @media screen and (max-width: 768px) {
    .container {
    grid-template-columns: repeat(1, 1fr);
    }
    }
</style>
