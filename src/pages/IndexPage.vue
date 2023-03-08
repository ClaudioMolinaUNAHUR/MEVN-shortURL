<template>
  <q-page padding>
    <add-link class="q-mb-lg"/>
    <template
      v-for="link of useLink.links"
      :key="link._id"
      >
        <link-card :link="link"/>
    </template>

  </q-page>
</template>

<script setup>
import { uselinkStore } from 'src/stores/link-store';

//components
import addLink from 'src/components/AddLink.vue';
import LinkCard from 'src/components/LinkCard.vue';

const useLink = uselinkStore();

</script>
