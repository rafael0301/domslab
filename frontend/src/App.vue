<template>
  <div class="min-h-screen bg-background">
    <nav class="bg-surface border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-primary">DOMSLab</h1>
            </div>
            <div class="hidden sm:ml-10 sm:flex sm:space-x-8">
              <router-link
                  v-for="item in menuItems"
                  :key="item.path"
                  :to="item.path"
                  custom
                  v-slot="{ href, navigate, isActive }"
              >
                <a
                    :href="href"
                    @click="navigate"
                    :class="[
                    'inline-flex items-center px-3 py-4 text-sm font-medium border-b-2',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:border-secondary-dark hover:text-text-primary'
                  ]"
                >
                  {{ item.name }}
                </a>
              </router-link>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button class="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-secondary-light transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>

            <button class="p-2 text-text-secondary hover:text-primary rounded-full hover:bg-secondary-light transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="relative">
              <button class="flex items-center text-text-secondary hover:text-text-primary transition-colors duration-200">
                <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/300" alt="Avatar de usuario" />
                <span class="ml-2 text-sm font-medium hidden md:block">Admin</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-secondary-light border-t border-border">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-center items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-sm text-text-secondary">
              © 2024 DOMSLab. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { name: 'Resumen', path: '/' },
  { name: 'Clientes', path: '/clientes' },
  { name: 'Tipos de Concreto', path: '/tipos-concreto' },
  { name: 'Pedidos', path: '/pedidos' },
  { name: 'Reportes', path: '/reportes' }
])
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .sm\:space-x-8 > * + * {
    margin-left: 0;
  }
}
</style>
