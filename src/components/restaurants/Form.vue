<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section class="row items-center hidden">
      <q-space />
      <q-btn id="closeDialogBtn" icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="bg-primary text-white text-h6 text-center">
      {{type.charAt( 0 ).toUpperCase() + type.slice( 1 )}} - {{title}}
    </q-card-section>
    <q-card-section>
      <div class="text-center q-pa-md" v-if="item != null">
        <q-img
          :src="item.photo_url"
          style="max-width: 500px; height: 350px;"
          fit="cover"
        />
      </div>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <div v-if="type == 'edit'" v-for="field in fields" >
          <q-input
            v-if="acceptedFields.includes( field.field )"
            filled
            :type="( (field.type) ? field.type : 'text' )"
            v-model="newInfo[ field.field ]"
            :label="field.label"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something' ]"
          />
          <!-- {{field}} -->
        </div>
        <div v-else v-for="field in fields">
          <q-input
            v-if="acceptedFields.includes( field.field )"
            filled
            :type="( (field.type) ? field.type : 'text' )"
            v-model="newInfo[ field.field ]"
            :label="field.label"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something' ]"
          />
        </div>

      </q-form>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat color="red" label="Cancel" v-close-popup />
      <q-btn color="primary" label="Save" @click="onSave" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useQuasar, Notify } from 'quasar';

const $q = useQuasar();

export default {
  props: {
    fields: {
      type: Object
    },
    acceptedFields: {
      type: Array
    },
    item: {
      type: Object
    },
    type: {
      type: String
    },
    title: {
      type: String
    }
  },
  setup () {
    return {
      $q
    }
  },
  data () {
    return {
      // If this.item is empty then value is {}, but if this.item is not empty the value is a copy of this.item
      newInfo: ( (this.item) ? { ...this.item } : {} ),
      refItem: this.item
    }
  },
  computed: {
  },
  methods: {
    onSave () {
      if ( this.type == 'edit' ) {
        const url = `/restaurants/${this.newInfo.id}`;
        const toSend = { restaurant: { user_id: 1 } };

        Object.keys( this.newInfo ).forEach( ( key ) => {

          if ( this.acceptedFields.includes( key ) ) {
            const value = this.newInfo[ key ];

            this.item[ key ] = value;
            toSend.restaurant[ key ] = value;
          }
        } );

        // Send info to API
        this.$api.patch( url, toSend ).then( ( response ) => {
          console.log( response );
        } );
      } else if ( this.type == 'create' ) {
        const url = '/restaurants';
        const toSend = {
          restaurant: Object.assign( { user_id: 1 }, { ...this.newInfo } )
        }

        // Send info to API
        this.$api.post( url, toSend ).then( ( response ) => {
          console.log( response );

          // Reload page
          this.$router.push( '/' ).then( () => {
            this.$router.push( '/restaurants' );
          } );
        } );
      }

      // Message
      Notify.create( {
        message: 'Done!',
        color: 'positive',
        position: 'top',
        icon: 'check_circle'
      } )
    }
  }
}
</script>
