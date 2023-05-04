<template>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-md full-width shadow-8" style="max-width: 400px;">
      <h5 class="text-center">Login</h5>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="myForm"
      >
        <q-input
          filled
          v-model="username"
          label="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup () {
  },
  computed: {
  },
  data () {
  },
  methods: {
  }
}
</script>
