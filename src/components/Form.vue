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
      <!-- <q-img  /> -->

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
        <div v-else>
          CREATE!!
        </div>

      </q-form>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat color="red" label="Cencel" @click="onCancel" />
      <q-btn color="primary" label="Save" @click="onSave" />
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
      newInfo: { ...this.item },
      refItem: this.item
    }
  },
  computed: {
  },
  methods: {
    onCancel () {
      document.getElementById( 'closeDialogBtn' ).click();
    },
    onSave () {
      if ( this.type == 'edit' ) {
        Object.keys( this.newInfo ).forEach( ( key ) => {
          this.item[ key ] = this.newInfo[ key ];
        } );
      } else {
        console.log( 'CREATE!!' );
      }

      // Message
      Notify.create( {
        message: 'Changes saved!',
        color: 'positive',
        position: 'top',
        icon: 'check_circle'
      } )
    }
  }
}
</script>
