<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      row-key="name"
      :rows="rows"
      :columns="columns"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top-right>
        <q-btn color="primary" icon="add_circle" :label="`Create ${title}`" @click="onCreate" />
      </template>

      <template v-slot:body-cell-photo_url="props">
          <!-- props.row.photo_url -->
        <q-img
          src="https://picsum.photos/500/300"
          spinner-color="white"
          style="height: 50px; max-width: 100px"
        />
      </template>

      <!-- Actions -->
      <template v-slot:body-cell-actions="props">
        <div class="q-pa-md text-center">
          <!-- <q-btn-group> -->
            <q-btn
              class="q-mx-sm"
              color="primary"
              icon="edit"
              no-caps
              dense
              rounded
              @click="onEdit( props.row )"
            />
            <q-btn
              class="q-mx-sm"
              color="red"
              icon="delete"
              no-caps
              dense
              rounded
              @click="confirmDelete( props.row.id )"
            />
          <!-- </q-btn-group> -->
        </div>
      </template>
    </q-table>

    <!-- Dialog -->
    <q-dialog v-model="confirmDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red" text-color="white" />
          <span class="q-ml-sm">Are you sure of this action?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="onDelete" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showInfo">

      <!-- Form type=create|edit -->
      <RestaurantForm
        v-if="formCreate"
        type="create"
        :title="title"
        :fields="columns"
        :acceptedFields="[ 'name', 'email', 'datetime' ]"
        :restaurants="restaurants"
      />
      <RestaurantForm
        v-else
        type="edit"
        :title="productToShow.name"
        :fields="columns"
        :item="productToShow"
        :acceptedFields="[ 'name', 'email', 'datetime' ]"
        :restaurants="restaurants"
      />
    </q-dialog>
  </div>
</template>

<script>
import { Loading } from 'quasar'
import RestaurantForm from 'src/components/reservations/Form.vue'

const columns = [
  { align: 'center', name: 'id', label: 'ID', field: 'id' },
  { align: 'center', name: 'name', label: 'Name', field: 'name' },
  { align: 'center', name: 'restaurant_id', label: 'Restaurant ID', field: 'restaurant_id' },
  { align: 'center', name: 'email', label: 'Email', field: 'email' },
  { type: 'datetime-local', align: 'center', name: 'datetime', label: 'Date Time', field: 'datetime' },
  { align: 'center', name: 'actions', label: 'Actions', field: 'actions' }
];

const visibleColumns = [
  'actions',
  'id',
  'name',
  'restaurant_id',
  'datetime',
  'email'
];

export default {
  components: {
    RestaurantForm
  },
  props: {
    title: {
      type: String
    }
  },
  setup () {
    return {
      visibleColumns,
      columns
    }
  },
  data () {
    return {
      rows: [],
      showInfo: false,
      formCreate: false,
      confirmDialog: false,
      idToDelete: null,
      productToShow: {},
      restaurants: []
    }
  },
  mounted () {
    Loading.show()
    this.$api.get( '/reservations' )
      .then( ( response ) => {
        let products = response.data

        // Assign response
        this.rows = products

        this.$api.get( '/restaurants' ).then( ( response ) => {
          response.data.forEach( ( restaurant ) => {
            const key = restaurant.name;
            const value = restaurant.id;

            this.restaurants[ key ] = value;
          } );
        } );

        // Disable loading
        Loading.hide()
      } );
  },
  methods: {
    onEdit ( productInfo ) {
      this.productToShow = productInfo;
      this.showInfo = true;
      this.formCreate = false;
    },
    onCreate () {
      this.showInfo = true;
      this.formCreate = true;
    },
    confirmDelete ( item_id ) {
      this.confirmDialog = true;
      this.idToDelete = item_id;
    },
    onDelete () {
      // console.log( 'item_id:', this.idToDelete );
      const url = `/reservations/${this.idToDelete}`;

      // Delete of the system
      this.$api.delete( url )
        .then( ( response ) => {
          // console.log( response );
          this.reloadPage();
        } );
    },
    reloadPage () {
      this.$router.push( '/' ).then( () => {
        this.$router.push( '/reservations' );
      } );
    }
  }
}
</script>
