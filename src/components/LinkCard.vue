<script setup>
import{ uselinkStore } from '../stores/link-store';
import { useQuasar } from 'quasar';
import { useNotify } from '../composables/notifyHook'

const { successNotify, errorNotify } = useNotify()
const $q = useQuasar();

const useLink = uselinkStore()

defineProps({
  link: Object
})

const deleteLink = async(id) =>{
  $q.dialog({
      title: 'Cuidado',
      message: '¡estas por eliminar un Link!',
      cancel: true,
      persistent: true
    }).onOk( async() =>{
      try {
        await useLink.removeLink(id)
        successNotify('Se elimino el Link')
      } catch (error) {
        console.log(error)
        if(error.errors){
          return error.errors.forEach(item => {
            errorNotify(item.msg)
          });
        }
        errorNotify("Error al eliminar")
      }
    })
  }
const updateLink = (link) => {
  $q.dialog({
        title: 'Actualizar Link',
        message: 'Actualiza tu link',
        prompt: {
          model: link.longLink,
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk( async(updateUrl) => {
        try {
          const newLink = {...link, longLink: updateUrl};
          await useLink.modifiedLink(newLink)
          successNotify('se actualizo el link')
        } catch (error) {
          if(error.errors){
            return error.errors.forEach(item => {
              errorNotify(item.msg)
            });
          }
          errorNotify("Error al agregar")
        }
      })
};
const copyLink = async(nanoLink) => {
    try {
      const path = process.env.FRONT_URI + nanoLink
      await navigator.clipboard.writeText(path)
      successNotify('Link copiado')
    } catch (error) {
      errorNotify(error)
    }
}
</script>

<template>
  <q-card class="my-card q-mb-sm">
      <q-card-section class="q-pt-xs">
            <div class="text-overline">{{link.longLink}}</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{link.nanoLink}}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <!-- activar mdi-v5 en quasar config y llamar iconos con mdi-name -->
        <q-btn flat round icon="mdi-trash-can-outline" color="red" @click="deleteLink(link.id)"/>
        <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)" />
        <q-btn flat color="blue" @click="copyLink(link.nanoLink)">COPY</q-btn>
      </q-card-actions>

  </q-card>
</template>
