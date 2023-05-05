import { useAuthStore } from 'stores/auth';

export const addBeforeEach = (router) => {
  const storeAuth = useAuthStore();

  router.beforeEach( async ( to, from ) => {
    const validation = ( to.path === '/login' );
    let isAuthenticated = storeAuth.isAuthenticated;

    if (!isAuthenticated) {
      await storeAuth.checkToken()
    }

    if ( !storeAuth.isAuthenticated ) {
      // console.log( 'User is not logged' );
      if ( !validation ) { return '/login' }
    } else {
      // if ( validation ) { return '/' }
      // console.log( 'User is logged' );
    }
  } );
}
