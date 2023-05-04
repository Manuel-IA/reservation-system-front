<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="">
    <h1 class="text-center">Hello, World!</h1>

    <List/>
  </q-page>
</template>

<script>
// import { defineComponent } from 'vue'
import List from 'components/List.vue'

export default {
  components: {
    List
  },
  setup () {
    return {
    }
  }
}
</script>
