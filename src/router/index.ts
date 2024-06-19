import {createRouter, createWebHistory, type Router} from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Primary from '@/views/Primary.vue';
import Main from '@/views/Main.vue';
import About from '@/views/About.vue';
import Contacts from '@/views/Contacts.vue';
import TasksAndMaterials from '@/views/TasksAndMaterials.vue';
import Task from '@/views/Task.vue'
import Tasks from '@/views/Tasks.vue'
import Lessons from '@/views/Lessons.vue'
import Lesson from '@/views/Lesson.vue'
import Topics from '@/views/Topics.vue';
import Results from '@/views/Results.vue';

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
            path: '/topics',
            name: 'topics',
            component: Topics
        },
        {
            path: '/tasksandmaterials',
            name: 'tasksandmaterials',
            component: TasksAndMaterials
        },
        {
            path: '/task/:code',
            name: 'task',
            component: Task
        },
        {
            path: '/lesson/:code',
            name: 'lesson',
            component: Lesson
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: Tasks
        },
        {
            path: '/lessons',
            name: 'lessons',
            component: Lessons
        },
        {
            path: '/results',
            name: 'results',
            component: Results
        }
    ]
})

export default router
