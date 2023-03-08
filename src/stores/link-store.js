import {defineStore} from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from './user-store';
import { useQuasar } from 'quasar';


export const uselinkStore = defineStore('url', ()=> {
  const $q = useQuasar();

  const userStore = useUserStore();
  const links = ref([])

  const createLink = async(longLink)=> {
    try {
      $q.loading.show({message: 'Añadiendo link'})
      const res = await api({
        method: 'POST',
        url:'/links',
        headers: {
          Authorization: "Bearer " + userStore.token
        },
        data: {
          longLink
        }
      })
      links.value.push(res.data.resultado)
    } catch (error) {
      throw (error.response.data || error)
    }finally{
      $q.loading.hide()
    }
  }
  const getLinks = async() => {
    try {
      $q.loading.show({message: 'Obteniendo links'})
      console.log('llamando links')
      const res = await api({
        url:'/links',
        method:'GET',
        headers: {
          Authorization: "Bearer " + userStore.token
        }
      })
      links.value = res.data.links.map(item => ({id: item._id, longLink: item.longLink, nanoLink: item.nanoLink}))
      //links.value = [...res.data.links] opcion spread operator
    } catch (error) {
      throw (error.response.data || error)
    }finally{
      $q.loading.hide()
    }
  }
  getLinks();

  const removeLink = async(id) => {
      try {
        $q.loading.show({message: 'eliminando'})
        await api({
          url:`/links/${id}`,
          method:'DELETE',
          headers: {
            Authorization: "Bearer " + userStore.token
          }
        })
        links.value = links.value.filter(item => (item.id !== id))
      } catch (error) {
        throw (error.response.data || error)
      }finally{
        $q.loading.hide()
      }
  }

  const modifiedLink = async(newLink) => {
    try {
      $q.loading.show({message: 'modificando'})
      await api({
        url:`/links/${newLink.id}`,
        method:'PATCH',
        headers: {
          Authorization: "Bearer " + userStore.token
        },
        data: {
          longLink: newLink.longLink
        }
      })
      links.value = links.value.map(item => { item.id === newLink.id ? newLink : item } )
    } catch (error) {
      throw (error.response.data || error)
    }finally{
      $q.loading.hide()
    }
  }

  return {
    links,
    createLink,
    getLinks,
    removeLink,
    modifiedLink
  }
})
