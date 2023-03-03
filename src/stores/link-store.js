import {defineStore} from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from './user-store';

export const uselinkStore = defineStore('url', ()=> {

  const userStore = useUserStore();
  const links = ref([])

  const createLink = async(longLink)=> {
    try {
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
    }
  }
  const getLinks = async() => {
    try {
      console.log('llamando links')
      const res = await api({
        url:'/links',
        method:'GET',
        headers: {
          Authorization: "Bearer " + userStore.token
        }
      })
      links.value = res.data.links.map(item => ({longLink: item.longLink, nanoLink: item.nanoLink}))
      //links.value = [...res.data.links] opcion spread operator
    } catch (error) {
      throw (error.response.data || error)
    }
  }
  getLinks();

  return {
    links,
    createLink,
    getLinks
  }
})
