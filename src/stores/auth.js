import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import jwt_decode from 'jwt-decode'

function decodePayload (accessToken) {
  return jwt_decode(accessToken)
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    refreshToken: '',
    authenticated: false,
    email: '',
    id: ''
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    setTokens ( accessToken ) {
      this.accessToken = accessToken
      this.authenticated = true
      this.setLocalTokens()
      this.setHeaderToken(this.accessToken)
      // const payload = decodePayload(this.accessToken)
      this.id = this.accessToken.data.user.id
      this.email = this.accessToken.data.user.email
    },
    deleteTokens () {
      this.accessToken = ''
      this.refreshToken = ''
      this.authenticated = false
      this.deleteLocalTokens()
      this.id = ''
      this.name = ''
    },
    setLocalTokens () {
      localStorage.setItem( 'accessToken', JSON.stringify( this.accessToken ) );
    },
    getLocalToken () {
      const accessToken = JSON.parse( localStorage.getItem( 'accessToken' ) );
      return accessToken === null ? '' : accessToken
    },
    deleteLocalTokens () {
      localStorage.removeItem( 'accessToken' );
    },
    setHeaderToken ( accessToken ) {
      // api.defaults.headers.common.Authorization = `Bearer ${accessToken} `
      api.defaults.headers.common.Authorization = accessToken.headers.authorization
    },
    deleteHeaderTokens () {
      delete api.defaults.headers.common.Authorization
      delete api.defaults.headers.common.refreshtoken
    },
    async checkToken () {
      let accessToken = this.accessToken;

      if ( !accessToken ) {
        accessToken = this.getLocalToken();
      }

      if ( accessToken !== '' && accessToken !== undefined ) {
        await this.refreshAccessTokens( accessToken );
      } else {
        this.deleteTokens()
        return false
      }
    },
    // accessToken has a spanlife of (1 hour), and needs to be exchanged if expires
    // refreshToken has a spanlife of (3 months), the user have to re-login when expires
    // date comparison taken from https://github.com/auth0/node-jsonwebtoken/blob/master/verify.js
    async refreshAccessTokens ( accessToken ) {
      this.setTokens( accessToken );
    }
  }
})
