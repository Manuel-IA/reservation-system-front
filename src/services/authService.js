import { api } from 'boot/axios'
import { useAuthStore } from 'stores/auth'
import qs from 'qs'

const storeAuth = useAuthStore()

const auth = {
  async login ( credentials ) {
    const data = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    }
    const options = {
      method: 'POST',
      data: qs.stringify( data ),
      url: '/users/sign_in'
    }

    return api( options )
      .then(response => {
        storeAuth.setTokens( response )
      })
      .catch(response => {
        console.log( response );
        // storeAuth.deleteTokens()
      })
  },
  async logout () {
    const options = {
      method: 'DELETE',
      data: qs.stringify( '' ),
      url: '/users/sign_out'
    }
    return api(options)
      .then(response => {
        storeAuth.deleteTokens()
      })
      .catch(response => {
        storeAuth.deleteTokens()
        console.log('logout error ' + response)
      })
  }
}

export { auth }
