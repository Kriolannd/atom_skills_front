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
import { getAll, saveEntityForm } from "../services/someEntityService"

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


const opts: SomeEnum[] = [SomeEnum.FIRST, SomeEnum.SECOND]

const itemss = ref<MenuItem[]>([
    { label: 'Send Data', icon: PrimeIcons.SEND },
]);

const activeItem = ref<MenuItem>(itemss.value[0]);

const onTabClick = (item: MenuItem) => {
    activeItem.value = item;
    displayDialog.value = true;
};

const onDialogHide = () => {
      displayDialog.value = false;
};

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

const value1 = ref(null);
const value2 = ref(null);


// type Items<T> = {
//     value: T[];
// }

interface Item {
  id: number;
  name: string;
}

const products = ref();

const valuee = ref("");
const items: any = ref([]);
// const items: Items<string | number> = ref([]);

const selectedCountry = ref();
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const search = (event: any) => {
    let _items = [...Array(10).keys()];

    items.value = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
}

const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);
const loading = ref(true);

onMounted(() => {
    CustomerService.getCustomersMedium().then((data: any) => {
            customers.value = getCustomers(data);
            loading.value = false;
        });
    someEntityRequest() 
    // loading.value = false;
});

const getCustomers = (data: any) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const formatDate = (value: any) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value: any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (status: any) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return 'renewal';
    }
}

// const formData = ref({
//   name: '',
//   email: '',
// });

// const handleSubmit = async () => {
//   try {
//     const response = await fetch('/your-backend-endpoint', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData.value),
//     });

//     if (response.ok) {
//       console.log('Данные успешно отправлены!');
//       formData.value = { name: '', email: '' }; 
//     } else {
//       console.error('Ошибка при отправке данных!');
//     }
//   } catch (error) {
//     console.error('Ошибка:', error);
//   }
// };
</script>

<template>
  <div class="main-container">
    <div class="left-side">
      <div class="card flex justify-content-center">
        <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Country" class="w-full md:w-14rem">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Dropdown>
      </div>
    </div>

    <div class="right-side">
      <div class="card flex flex-wrap justify-content-center gap-3">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search"> </InputIcon>
          <InputText v-model="value1" placeholder="Search" />
        </IconField>

        <IconField>
          <InputIcon class="pi pi-spin pi-spinner"> </InputIcon>
          <InputText v-model="value2" />
        </IconField>

        <AutoComplete v-model="valuee" dropdown :suggestions="items" @complete="search" />
      </div>
    </div>
    <div class="card under-side">
      <DataTable v-model:filters="filters" :value="customers" paginator :rows="5" dataKey="id" filterDisplay="row" :loading="loading"
                :globalFilterFields="['name', 'country.name', 'representative.name', 'status']">
            <template #header>
                <div class="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Country" filterField="country.name" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <img alt="flag" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${data.country.code}`" style="width: 24px" />
                        <span>{{ data.country.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <Column header="Agent" filterField="representative" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter" style="min-width: 14rem" :maxSelectedLabels="1">
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column>
            <Column field="status" header="Status" :showFilterMenu="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="verified" header="Verified" dataType="boolean" style="min-width: 6rem">
                <template #body="{ data }">
                    <i class="pi" :class="{ 'pi-check-circle text-green-500': data.verified, 'pi-times-circle text-red-400': !data.verified }"></i>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
                </template>
            </Column>
        </DataTable>
        <!-- <Paginator :rows="2" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator> -->
      <!-- <form @submit.prevent> -->
        <div class="custom-tab-menu">
          <ul class="tabmenu-list main-ul">
            <li
              v-for="item in itemss"
              :key="item.label"
              :class="{ 'active': item === activeItem }"
              @click="onTabClick(item)"
            >
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </li>
          </ul> 

          <Dialog v-model:visible="displayDialog" modal header="Send Data" @hide="onDialogHide" :style="{ width: '25rem'}">
            <form @submit.prevent>
              <div class="flex flex-col gap-4 mb-4">
                <div class="flex align-items-center gap-3 mb-3">
                  <label for="some-text" class="font-semibold w-6rem">Some text</label>
                  <InputText 
                    id="some-text" 
                    v-model="someData.text" 
                    class="text-sm" 
                    placeholder="Enter some text"
                    required
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-5">
                  <label for="some-number" class="font-semibold w-6rem">Some number</label>
                  <InputNumber 
                    id="some-number" 
                    v-model="someData.number" 
                    class="text-sm" 
                    placeholder="Enter some number"
                    required
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-7">
                  <label for="some-date" class="font-semibold w-6rem">Some date</label>
                  <Calendar 
                    id="some-date" 
                    v-model="someData.date" 
                    class="text-sm" 
                    dateFormat="dd/mm/yy"
                    placeholder="Enter some date"
                    showIcon
                    required
                  />
                </div>
                <div class="flex align-items-center gap-3 mb-9">
                  <label for="some-enum" class="font-semibold w-6rem">Some enum</label>
                  <Dropdown 
                    id="some-enum" 
                    v-model="someData.someEnum" 
                    class="text-sm" 
                    placeholder="Enter some enum"
                    :options="opts"
                    required
                  />
                </div>
                <div class="card flex justify-center">
                  <label for="some-file" class="font-semibold w-6rem">Some file</label>
                  <Toast />
                  <FileUpload mode="basic" name="demo[]" :maxFileSize="1000000" @upload="onUpload" chooseLabel="Browse" 
                    ref="fileupload"
                  />
                </div>
                <Button
                    :disabled="!someData.text || !someData.number || !someData.someEnum || !someData.date"
                    class="flex justify-center items-center"
                    type="submit"
                    @click="someDataRequest">
                  Send
                </Button>
              </div>
          </form>
          </Dialog>
        </div>
      <!-- </form>  -->
    </div>
  </div>
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
