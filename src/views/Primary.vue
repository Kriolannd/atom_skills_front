<script lang="ts" setup>
import { ref } from "vue";
import {PrimeIcons} from "primevue/api";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import {useRouter} from "vue-router";
import type { ISomeData } from "@/interfaces/submit";
import { SomeEnum } from "@/utilities/someEnum";
import {submitRequest} from "@/utilities/submitRequest";

const router = useRouter();

const menuData = {
  main: ["Главная", "main"],
  about: ["О нас", "about"],
  contacts: ["Контакты", "contacts"],
  add: ["Дополнительная информация", "add"]
}

const redirect = (path: string): void => {
    try {
        console.log(router);
        router.push({ name: path }); 
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
  <nav class="primary-nav">
    <ul class="primary-ul">
      <li v-for="data in menuData" class="primary-li">
        <a class="primary-a" @click="redirect(data[1])">{{ data[0] }}</a>
      </li>
    </ul>
  </nav>

</template>

<style>
  .primary-nav {
    background-color: #333;
    color: #fff;
    padding: 10px;
    position: fixed;
    top: 0;
    width: 100%;
  }
  
  .primary-ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    justify-content: space-around;
    flex-direction: row;
  }
  
  .primary-li {
    margin-right: 20px;
    flex-basis: auto;
    flex-grow: 1;
    text-align: center;
  }
  
  .primary-a {
    color: #fff;
    text-decoration: none;
  }

  /* .custom-tab-menu {
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
  