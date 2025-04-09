<template>
  <div class="space-y-6">
    <!-- Encabezado -->
    <section class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-text-primary">Tipos de Concreto</h1>
      <button @click="abrirModal()" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Nuevo Tipo
      </button>
    </section>

    <!-- Filtros (Opcional) -->
    <section class="card p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
          type="text"
          placeholder="Buscar por nombre o código..."
          class="input md:col-span-2"
          v-model="filtroBusqueda"
      >
      <select class="select" v-model="filtroResistencia">
        <option value="">Todas las Resistencias</option>
        <option value="H15">H15 (15 MPa)</option>
        <option value="H20">H20 (20 MPa)</option>
        <option value="H25">H25 (25 MPa)</option>
        <option value="H30">H30 (30 MPa)</option>
        <option value="H35">H35 (35 MPa)</option>
        <option value="Mortero">Mortero</option>
      </select>
    </section>

    <!-- Grid de Tipos de Concreto -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="tipo in tiposFiltrados" :key="tipo.id" class="card flex flex-col">
        <div class="p-5 flex-grow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-text-primary">{{ tipo.nombre }}</h3>
            <span class="text-sm font-medium px-2 py-0.5 rounded"
                  :class="tipo.categoria === 'Hormigón' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'">
                   {{ tipo.categoria }}</span>
          </div>
          <p class="text-sm text-text-secondary mb-3">{{ tipo.descripcion }}</p>
          <div class="text-sm space-y-1">
            <p><span class="font-medium text-text-secondary">Código:</span> {{ tipo.codigo }}</p>
            <p><span class="font-medium text-text-secondary">Resistencia:</span> {{ tipo.resistencia }} MPa</p>
            <p><span class="font-medium text-text-secondary">Uso:</span> {{ tipo.uso }}</p>
          </div>
        </div>
        <div class="px-5 py-3 bg-gray-50 border-t border-border flex justify-between items-center">
          <span class="text-lg font-bold text-text-primary">${{ tipo.precio_m3 }} <span class="text-xs font-normal text-text-secondary">/ m³</span></span>
          <div class="space-x-3">
            <button @click="abrirModal(tipo)" class="text-primary hover:text-primary-dark text-sm font-medium">Editar</button>
            <button @click="eliminarTipo(tipo.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">Eliminar</button>
          </div>
        </div>
      </div>
      <div v-if="tiposFiltrados.length === 0" class="col-span-full text-center py-12 text-sm text-text-secondary">
        No se encontraron tipos de concreto que coincidan con los filtros.
      </div>
    </section>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto">
        <div class="flex justify-between items-center p-5 border-b border-border">
          <h3 class="text-lg font-semibold text-text-primary">{{ tipoSeleccionado ? 'Editar Tipo' : 'Nuevo Tipo' }}</h3>
          <button @click="cerrarModal" class="text-text-secondary hover:text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form @submit.prevent="guardarTipo">
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary">Nombre</label>
                <input v-model="formTipo.nombre" type="text" required class="input">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary">Código</label>
                <input v-model="formTipo.codigo" type="text" required class="input">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">Categoría</label>
              <select v-model="formTipo.categoria" required class="select">
                <option value="Hormigón">Hormigón</option>
                <option value="Mortero">Mortero</option>
                <option value="Especial">Especial</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">Descripción Breve</label>
              <input v-model="formTipo.descripcion" type="text" class="input">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary">Resistencia (MPa)</label>
                <input v-model="formTipo.resistencia" type="number" step="1" required class="input">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary">Precio por m³</label>
                <input v-model="formTipo.precio_m3" type="number" step="0.01" required class="input">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">Uso Recomendado</label>
              <textarea v-model="formTipo.uso" rows="2" class="input"></textarea>
            </div>
          </div>
          <div class="flex justify-end items-center p-5 border-t border-border space-x-3">
            <button type="button" @click="cerrarModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Tipo</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showModal = ref(false)
const tipoSeleccionado = ref(null)
const filtroBusqueda = ref('')
const filtroResistencia = ref('')

const getInitialFormState = () => ({
  id: null,
  nombre: '',
  codigo: '',
  categoria: 'Hormigón',
  descripcion: '',
  resistencia: 20,
  precio_m3: 0,
  uso: ''
})

const formTipo = ref(getInitialFormState())

// Datos de ejemplo
const tipos = ref([
  { id: 1, nombre: 'Hormigón Estructural H20', codigo: 'HE-H20', categoria: 'Hormigón', descripcion: 'Uso general en estructuras', resistencia: 20, precio_m3: 85.50, uso: 'Losas, vigas, columnas pequeñas' },
  { id: 2, nombre: 'Hormigón Alta Resistencia H30', codigo: 'HE-H30', categoria: 'Hormigón', descripcion: 'Para elementos de alta exigencia', resistencia: 30, precio_m3: 95.00, uso: 'Columnas grandes, puentes, pavimentos' },
  { id: 3, nombre: 'Mortero de Pega M5', codigo: 'MO-M5', categoria: 'Mortero', descripcion: 'Para albañilería y mampostería', resistencia: 5, precio_m3: 60.00, uso: 'Pega de bloques, ladrillos' },
  { id: 4, nombre: 'Hormigón Bombeable H25', codigo: 'HB-H25', categoria: 'Hormigón', descripcion: 'Facilita colocación con bomba', resistencia: 25, precio_m3: 92.75, uso: 'Losas de difícil acceso, muros' },
])

const tiposFiltrados = computed(() => {
  let resultado = [...tipos.value]
  const search = filtroBusqueda.value.toLowerCase()

  if (search) {
    resultado = resultado.filter(t =>
        t.nombre.toLowerCase().includes(search) ||
        t.codigo.toLowerCase().includes(search)
    )
  }
  if (filtroResistencia.value) {
    if(filtroResistencia.value === 'Mortero') {
      resultado = resultado.filter(t => t.categoria === 'Mortero')
    } else {
      const resValue = parseInt(filtroResistencia.value.replace('H', ''), 10)
      resultado = resultado.filter(t => t.categoria === 'Hormigón' && t.resistencia === resValue)
    }
  }
  return resultado
})

const abrirModal = (tipo = null) => {
  if (tipo) {
    tipoSeleccionado.value = tipo
    formTipo.value = { ...tipo }
  } else {
    tipoSeleccionado.value = null
    formTipo.value = getInitialFormState()
  }
  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
  setTimeout(() => {
    tipoSeleccionado.value = null
    formTipo.value = getInitialFormState()
  }, 300)
}

const guardarTipo = () => {
  if (tipoSeleccionado.value) {
    const index = tipos.value.findIndex(t => t.id === tipoSeleccionado.value.id)
    if (index !== -1) tipos.value[index] = { ...formTipo.value }
  } else {
    const newId = tipos.value.length > 0 ? Math.max(...tipos.value.map(t => t.id)) + 1 : 1
    tipos.value.push({ ...formTipo.value, id: newId })
  }
  cerrarModal()
}

const eliminarTipo = (id) => {
  if (confirm('¿Estás seguro de eliminar este tipo de concreto?')) {
    tipos.value = tipos.value.filter(t => t.id !== id)
  }
}

</script>

<style scoped>
/* Estilos modal reutilizados de Clientes.vue si se ponen globales, o copiar aquí */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>