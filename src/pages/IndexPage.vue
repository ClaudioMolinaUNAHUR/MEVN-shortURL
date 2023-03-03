<template>
  <q-page padding>
    <add-link/>
    <pre>
      {{ useLink.links }}
    </pre>
    <template
      v-for="link of useLink.links"
      :key="link._id"
      >
        <link-card/>
    </template>
  </q-page>
</template>

<script setup>
import { uselinkStore } from 'src/stores/link-store';

//components
import addLink from 'src/components/AddLink.vue';
import LinkCard from 'src/components/linkCard.vue';

const useLink = uselinkStore();

</script>
