<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h2>Register</h2>
      <q-form @submit.prevent="handleSubmit">

        <q-input
        v-model="email"
        label="Ingrese Email"
        :rules="[val => val && /^[^@]+@\w+(\.\w+)+\w$/.test(val) || 'escriba un mail valido']"
        ></q-input>

        <q-input
        v-model="password"
        type="password"
        label="Ingrese Contraseña"
        :rules="[val => val && val.length >= 6 || 'contraseña minimo 6 caracteres']"
        autocomplete="on"
        ></q-input>

        <q-input
        v-model="repassword"
        type="password"
        label="Repita Contraseña"
        :rules="[val => val === password || 'no coinciden las contraseñas']"
        autocomplete="on"
        ></q-input>

        <div>
          <q-btn label="Register" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { useUserStore } from "../stores/user-store";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'; // useQuasar se usa para llamar a los plugin, hay que configurarlo en quasar.config.js
const email = ref('');
const password = ref('');
const repassword = ref('');

const router = useRouter();
const $q = useQuasar();

const userStore = useUserStore();

const handleSubmit = async() => {
  try {
    await userStore.register(email.value, password.value, repassword.value);
    router.push('/')
  } catch (error) {
    console.log("error", error.error) //a traves del throw del store, se envian los errores como catch a esta vista
    alertDialogBackend(error.error)

  }
}

const alertDialogBackend = (message = 'Error en servidor') => {
  $q.dialog({
      title: "Error",
      message
    })
}

</script>
