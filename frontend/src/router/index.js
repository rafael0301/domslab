import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Clientes from '@/views/Clientes.vue'
import TiposConcreto from '@/views/TipoConcreto.vue'
import Pedidos from '@/views/Pedidos.vue'
import Reportes from '@/views/Reportes.vue'

const routes = [
    {
        path: '/',
        name: 'Resumen',
        component: Dashboard
    },
    {
        path: '/clientes',
        name: 'Clientes',
        component: Clientes
    },
    {
        path: '/tipos-concreto',
        name: 'TiposConcreto',
        component: TiposConcreto
    },
    {
        path: '/pedidos',
        name: 'Pedidos',
        component: Pedidos
    },
    {
        path: '/reportes',
        name: 'Reportes',
        component: Reportes
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

export default router