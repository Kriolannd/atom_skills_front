<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Card from 'primevue/card';
import Button from "primevue/button";
import type { ITopicCard } from '@/interfaces/submit';
import { useRouter, type Router } from 'vue-router';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from "primevue/api";
import { getAllTopics } from "../services/topicService"

const cardData = ref<ICardData[]>([]);

const router = useRouter();

const redirectToTask = (code: string): void => {
    try {
        router.push({name: "task", params: {code: code}}); 
    } catch (error) {
        console.error(error);
    }
}

const filters = {
    global: { value: "" }
};

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
]);

let searchText = "";

let filterCards: ITopicCard[] = []

const filteredCardData = (): ITopicCard[] => {
    filterCards = cardData.value.filter(card => card.title.toLowerCase().includes(searchText.toLowerCase()))
    return filterCards
}

onMounted(() => {
    getAllTopics().then(response => {
        console.log(response.data)
        cardData.value = response.data
    })
})
 

// const filteredCardData = (): ICardData[] => {
//         searchText = filters.global.value.toLowerCase();
//         return cardData.value.filter(data => data.description.toLowerCase().includes(searchText));
// }

// onMounted(() => {
//     filteredCardData()
// });

</script>

<template>
    <div class="container">
        <!-- <Card style="width: 25rem; overflow: hidden" v-for="data in filteredCardData">

        </Card> -->

        <Card style="width: 25rem; overflow: hidden" v-for="data of cardData">
            <!-- <template #header>
                <img alt="user header" class="img" :src="data.image" />
            </template> -->
            <template #title>{{ data.title }}</template>
            <!-- <template #subtitle> {{ data.subtitle }}</template> -->
            <template #content>
                <p class="m-0">
                    {{ data.description }}
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" outlined class="w-full" />
                    <Button label="Save" class="w-full" @click="redirectToTask(data.code)" />
                </div>
            </template>
        </Card>
    </div>
</template>

<style>
    .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    max-height: 100vh;
    margin-top: 15vh;
    }

    .p-card-title:hover {
        background-color: antiquewhite;
    }

    /* .card { */
    /* width: 100%;
    max-width: 25rem;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
    /* background-color: #333;
    color: #fff; */
    /* padding: 10px;
    position: fixed;
    top: 0;
    width: 100%; */
    /* margin-bottom: -200px; */
    /* } */
    
    .add-card {
    padding: 10px;
    position: fixed;
    top: 0;
    width: 100%;
    }

    .img {
    width: 100%;
    height: auto;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    max-height: 100px;
    }

    .card-content {
    padding: 20px;
    }

    .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    }

    .card-subtitle {
    font-size: 1rem;
    color: #555;
    }

    .card-text {
    margin-top: 10px;
    }

    .card-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    }

    .button {
    flex: 1;
    }

    .button-secondary {
    background-color: #f1f1f1;
    }

    .button-primary {
    background-color: #007bff;
    color: #fff;
    }

    @media screen and (max-width: 768px) {
    .container {
    grid-template-columns: repeat(1, 1fr);
    }
    }
</style>
