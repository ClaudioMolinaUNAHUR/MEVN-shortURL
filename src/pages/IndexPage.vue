<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn> -->
    <q-btn @click="createLink">Create Link</q-btn>
    <!-- <q-btn @click="userStore.logout">Cerrar Sesion</q-btn> -->
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
//import axios from "axios";
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore(); // inicializar user-store // no se puede destructurar

//userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api("/links", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userStore.token.value,
      },
      data: {
        longLink: "www.google.com",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>
