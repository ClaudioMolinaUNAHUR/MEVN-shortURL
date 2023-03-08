<script setup>
import { ref } from 'vue'
import { uselinkStore } from 'src/stores/link-store';
import { useNotify } from '../composables/notifyHook'

const useLink = uselinkStore();
const { successNotify, errorNotify } = useNotify()

const link = ref('')
const loading = ref(false)

const addlink = async() => {
  try {
    loading.value = true
    await useLink.createLink(link.value)
    successNotify("Link agregado")
    link.value = ''
  } catch (error) {
    console.log(error)
    if(error.errors){
      return error.errors.forEach(item => {
        errorNotify(item.msg)
      });
    }
    errorNotify("Error al agregar")
  }finally{
    loading.value = false
  }
}

</script>

<template>
  <q-form @submit.prevent="addlink">
    <q-input
    v-model="link"
    label="Ingrese Link aquí">
    <!-- :rules="[(link) => (link && link.trim() !== '') || 'Escriba algo por favor']" DESHABILITO PARA MOSTRAR ERRORES DE BACKEND-->

    </q-input>
    <q-btn
    class="q-mt-sm full-width"
    label="Agregar"
    color="primary"
    type="submit"
    :loading="loading"
    ></q-btn>
  </q-form>
</template>
