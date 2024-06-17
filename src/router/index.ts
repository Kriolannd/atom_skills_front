import {createRouter, createWebHistory, type Router} from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Primary from '@/views/Primary.vue';
import Main from '@/views/Main.vue';
import About from '@/views/About.vue';
import Contacts from '@/views/Contacts.vue';
import Add from '@/views/Add.vue';
import TasksAndMaterials from '@/views/Add.vue';
import Lesson from '@/views/Lesson.vue'

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/primary',
            name: 'primary',
            component: Primary
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/contacts',
            name: 'contatcs',
            component: Contacts
        },
        {
            path: '/add',
            name: 'add',
            component: Add
        },
        {
            path: '/tasksandmaterials',
            name: 'tasksandmaterials',
            component: TasksAndMaterials
        },
        {
            path: '/lesson',
            name: 'lesson',
            component: Lesson
        }
    ]
})

export default router
