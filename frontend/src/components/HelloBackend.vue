<!-- frontend/src/components/HelloBackend.vue -->
<script setup>
import { ref, onMounted } from 'vue'

const mensaje = ref('Cargando...')

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()
  mensaje.value = data.message
})
</script>

<template>
  <div>
    <h2>Mensaje del Backend:</h2>
    <p>{{ mensaje }}</p>
  </div>
</template>
