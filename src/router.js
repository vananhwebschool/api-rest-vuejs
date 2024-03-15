import {createRouter, createWebHistory} from 'vue-router'

import SearchResults from './components/SearchResults.vue'
import OptionsBars from "./components/OptionsBars.vue";
import Login from "./components/Login.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/search', component: OptionsBars },
    { path: '/results/:arrondissement/:activity', component: SearchResults },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router