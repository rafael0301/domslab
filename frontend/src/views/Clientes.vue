<template>
  <div class="space-y-6">
    <!-- Encabezado -->
    <section class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-text-primary">Gestión de Clientes</h1>
      <button @click="abrirModal()" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Nuevo Cliente
      </button>
    </section>

    <!-- Filtros y Búsqueda (Opcional) -->
    <section class="card p-4">
      <input
          type="text"
          placeholder="Buscar por nombre o RUC/Cédula..."
          class="input"
          v-model="filtroBusqueda"
      >
    </section>

    <!-- Tabla de Clientes -->
    <section class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-border">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Nombre / Razón Social</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">RUC / Cédula</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Teléfono</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Último Pedido</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Acciones</th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-border">
          <tr v-for="cliente in clientesFiltrados" :key="cliente.id" class="hover:bg-secondary-light">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-text-primary">{{ cliente.nombre }}</div>
              <div class="text-sm text-text-secondary">{{ cliente.contacto || '' }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ cliente.identificacion }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ cliente.telefono }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ cliente.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ cliente.ultimoPedido || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
              <button @click="abrirModal(cliente)" class="text-primary hover:text-primary-dark">Editar</button>
              <button @click="eliminarCliente(cliente.id)" class="text-red-600 hover:text-red-800">Eliminar</button>
            </td>
          </tr>
          <tr v-if="clientesFiltrados.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-sm text-text-secondary">No se encontraron clientes.</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal de Cliente -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-5 border-b border-border">
          <h3 class="text-lg font-semibold text-text-primary">
            {{ clienteSeleccionado ? 'Editar Cliente' : 'Nuevo Cliente' }}
          </h3>
          <button @click="cerrarModal" class="text-text-secondary hover:text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <!-- Modal Body -->
        <form @submit.prevent="guardarCliente">
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-secondary">Nombre / Razón Social</label>
              <input v-model="formCliente.nombre" type="text" required class="input">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">RUC / Cédula</label>
              <input v-model="formCliente.identificacion" type="text" required class="input">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary">Teléfono</label>
                <input v-model="formCliente.telefono" type="tel" class="input">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary">Email</label>
                <input v-model="formCliente.email" type="email" class="input">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">Dirección</label>
              <textarea v-model="formCliente.direccion" rows="2" class="input"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">Contacto Principal (Opcional)</label>
              <input v-model="formCliente.contacto" type="text" class="input">
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="flex justify-end items-center p-5 border-t border-border space-x-3">
            <button type="button" @click="cerrarModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cliente</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showModal = ref(false)
const clienteSeleccionado = ref(null)
const filtroBusqueda = ref('')

// Estado inicial del formulario
const getInitialFormState = () => ({
  id: null,
  nombre: '',
  identificacion: '',
  telefono: '',
  email: '',
  direccion: '',
  contacto: '',
  ultimoPedido: null // Se podría llenar con datos reales
})

const formCliente = ref(getInitialFormState())

// Datos de ejemplo
const clientes = ref([
  { id: 1, nombre: 'Constructora XYZ', identificacion: 'RUC123456789', telefono: '555-1111', email: 'compras@xyz.com', direccion: 'Av. Principal 123', contacto: 'Ing. Pérez', ultimoPedido: '2024-04-08' },
  { id: 2, nombre: 'Inversiones ABC', identificacion: 'RUC987654321', telefono: '555-2222', email: 'admin@abc.com', direccion: 'Calle Secundaria 45', contacto: 'Lic. García', ultimoPedido: '2024-04-07' },
  { id: 3, nombre: 'Juan Rodríguez (Personal)', identificacion: '0991234567', telefono: '555-3333', email: 'juan.r@email.com', direccion: 'Urb. Los Pinos', contacto: '', ultimoPedido: '2024-03-15' },
])

// Filtrar clientes basado en búsqueda
const clientesFiltrados = computed(() => {
  if (!filtroBusqueda.value) {
    return clientes.value
  }
  const search = filtroBusqueda.value.toLowerCase()
  return clientes.value.filter(c =>
      c.nombre.toLowerCase().includes(search) ||
      c.identificacion.toLowerCase().includes(search)
  )
})

// Funciones del Modal
const abrirModal = (cliente = null) => {
  if (cliente) {
    clienteSeleccionado.value = cliente
    formCliente.value = { ...cliente } // Copiar datos para edición
  } else {
    clienteSeleccionado.value = null
    formCliente.value = getInitialFormState() // Resetear formulario
  }
  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
  // Pequeño delay para que la animación de cierre termine antes de resetear
  setTimeout(() => {
    clienteSeleccionado.value = null
    formCliente.value = getInitialFormState()
  }, 300)
}

// Funciones CRUD (simuladas)
const guardarCliente = () => {
  if (clienteSeleccionado.value) {
    // Actualizar
    const index = clientes.value.findIndex(c => c.id === clienteSeleccionado.value.id)
    if (index !== -1) {
      clientes.value[index] = { ...formCliente.value }
    }
  } else {
    // Crear
    const newId = clientes.value.length > 0 ? Math.max(...clientes.value.map(c => c.id)) + 1 : 1
    clientes.value.push({ ...formCliente.value, id: newId })
  }
  cerrarModal()
  // Aquí iría la llamada API para guardar en backend
}

const eliminarCliente = (id) => {
  // Añadir confirmación
  if (confirm('¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.')) {
    clientes.value = clientes.value.filter(c => c.id !== id)
    // Aquí iría la llamada API para eliminar en backend
  }
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>