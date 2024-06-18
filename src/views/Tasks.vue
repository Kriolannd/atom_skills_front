<script lang="ts" setup>
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import Tag from 'primevue/tag';
import Paginator from 'primevue/paginator';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/services/CustomerService';

import {PrimeIcons} from "primevue/api";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import {useRouter} from "vue-router";
import type { ISomeData, ISomeEntity } from "@/interfaces/submit";
import { SomeEnum } from "@/utilities/someEnum";
import {submitRequest} from "@/utilities/submitRequest";
import eventBus from "@/utilities/eventBus";
import { Severity } from "@/utilities/severityEnum";
import Button from "primevue/button";
import { redirect } from "@/utilities/redirect";
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";
import Rating from 'primevue/rating';
import { getAll, saveEntityForm } from "../services/someEntityService"
import { getAllTasks } from "../services/taskService"

const toast = useToast();

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    console.log(fileupload);
};

const fileupload = ref();

const displayDialog = ref(false);

interface MenuItem {
  label: string;
  icon: string;
}

const someData = ref<ISomeData>({
    text: "",
    number: 0,
    date: new Date(),
    someEnum: SomeEnum.FIRST,
    file: ""
});

let someEntityData = ref<ISomeEntity[]>([{
    id: 0,
    text: "",
    number: 0,
    date: new Date(),
    someEnum: SomeEnum.FIRST,
    file: ""
}]);


const itemss = ref<MenuItem[]>([
    { label: 'Send Data', icon: PrimeIcons.SEND },
]);

const someDataRequest = () => {
  saveEntityForm({ ...someData.value, file: fileupload.value.files[0] }).then(
    response => {
      console.log(response);
    }
  ).catch(
    error => {
      console.log(error);
      eventBus.emit('toast', { severity: Severity.ERROR, summary: 'Ошибка отправки данных', detail: 'Неправильно заполнены поля', life: 3000 });
    }
  )
}

const someEntityRequest = () => {
  getAll().then(
    response => {
      console.log(response)
      someEntityData = response.data;
      console.log(someEntityData);
    }
  ).catch(
    error => {
      console.log(error)
      eventBus.emit('toast', { severity: Severity.ERROR, summary: 'Ошибка получения данных', detail: 'Неправильно ролучены данные', life: 3000 });
    }
  )
}



const tasks = ref();
const filters = ref({
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    difficulty: { value: null, matchMode: FilterMatchMode.GREATER_THAN },
    time: { value: null, matchMode: FilterMatchMode.GREATER_THAN }
});

const loading = ref(true);

const selectedProduct = ref();
const onRowSelect = (event) => {
    console.log(selectedProduct)
};

onMounted(() => {
    // CustomerService.getCustomersMedium().then((data: any) => {
    //         customers.value = getCustomers(data);
    //         loading.value = false;
    //     });
    getAllTasks().then(response => {
      tasks.value = response.data;
      loading.value = false;
    })
});


</script>

<template>
  <DataTable v-model:selection="selectedProduct" :filters="filters" :value="tasks" selectionMode="single" paginator :rows="5" dataKey="code" filterDisplay="menu" :loading="loading" @rowSelect="onRowSelect" >
    <template #empty> No customers found. </template>
    <template #loading> Loading customers data. Please wait. </template>
    <Column field="title" header="Название" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.title }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"  placeholder="Search by name" />
        </template>
    </Column>
    <Column field="difficulty" header="Сложность" style="min-width: 12rem">
        <template #body="{ data }">
          <Rating :modelValue="data.difficulty" readonly :cancel="false" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
        </template>
    </Column>
    <Column field="time" header="Время на выполнение" style="min-width: 12rem">
        <template #body="{ data }">
            {{ data.time }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="number" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
        </template>
    </Column>
  </DataTable>
</template>

<style>

  .right-side,
  .left-side {
    display: flex;
    /* flex: 1 1 1; */
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
  }

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

  p {
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
  }
  
</style>
