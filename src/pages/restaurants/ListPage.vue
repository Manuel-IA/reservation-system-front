<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <h2 class="text-center">{{title}}</h2>

    <List :title="title" />
  </q-page>
</template>

<script>
// import { defineComponent } from 'vue';
import List from 'components/restaurants/List.vue';

export default {
  components: {
    List
  },
  setup () {
    return {
      title: 'Restaurants'
    }
  }
}
</script>
