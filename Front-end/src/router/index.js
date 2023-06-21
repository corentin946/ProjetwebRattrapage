import {createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Compte from '../views/Compte.vue'
import Tutoriel from '../views/Tutoriel.vue'
import Nouveau from '../views/Nouveau.vue'

//path to site pages
const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/compte', name: 'Compte', component: Compte},
    {path: '/:id', component: Tutoriel},
    {path: '/nouveau', name: 'Nouveau', component: Nouveau}
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router