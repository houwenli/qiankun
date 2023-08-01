import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
    { path: '/subone', component: null },
    { path: '/subtwo', component: null },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export {
    router
}