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
          v-model="loginForm.email"
          label="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="password"
          v-model="loginForm.password"
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
import { useQuasar, Notify } from 'quasar'
import { auth } from 'src/services/authService'
import { useAuthStore } from 'stores/auth'

const storeAuth = useAuthStore()

export default {
  setup () {
    const $q = useQuasar()
    return $q
  },
  computed: {
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {

      console.log( 'Loggin...' );
      await auth.login({
        email: this.loginForm.email,
        password: this.loginForm.password
      })

      if (storeAuth.isAuthenticated) {
        console.log( 'Logged' );
        this.$router.push( { path: '/' } )

        Notify.create( {
          message: 'Welcome!',
          color: 'positive',
          position: 'top',
          icon: 'check_circle'
        } );
      } else {
        this.loginForm.password = ''

        Notify.create( {
          message: 'Bad Credentials!',
          color: 'negative',
          position: 'top',
          icon: 'cancel'
        } );
      }
    },
    onReset () {}
  }
}
</script>
