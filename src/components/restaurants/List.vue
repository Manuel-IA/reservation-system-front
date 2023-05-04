<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      row-key="name"
      :rows="rows"
      :columns="columns"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top-left>
        <q-select
          style="width: 280px"
          label="Restaurant Name"
          v-model="character"
          :options="getAlphabet"
        >
          <template v-slot:after>
            <q-btn icon="search" @click="searchFirstChar"/>
          </template>

          <template v-slot:before>
            <q-btn icon="delete" flat @click="clearChar"/>
          </template>
        </q-select>
      </template>

      <template v-slot:top-right>
        <form @submit.prevent="onClickQuery" class="q-px-md" >
          <q-input
            v-model="toSearch"
            label="City"
            type="search"
            dense
          >
            <template v-slot:before>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            type="submit"
            class="hidden"
            icon="send"
          />
        </form>

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
        :acceptedFields="[ 'name', 'city', 'description', 'address', 'photo_url' ]"
      />
      <RestaurantForm
        v-else
        type="edit"
        :title="productToShow.name"
        :fields="columns"
        :item="productToShow"
        :acceptedFields="[ 'name', 'city', 'description', 'address', 'photo_url' ]"
      />
    </q-dialog>
  </div>
</template>

<script>
import { Loading } from 'quasar'
import RestaurantForm from 'src/components/restaurants/Form.vue'

const columns = [
  { align: 'center', name: 'id', label: 'ID', field: 'id' },
  { align: 'center', name: 'name', label: 'Restaurant Name', field: 'name' },
  { align: 'center', name: 'city', label: 'City', field: 'city' },
  { type: 'number', align: 'center', name: 'tables', label: 'Tables', field: 'tables' },
  { type: '', align: 'center', name: 'address', label: 'Address', field: 'address' },
  { type: 'textarea', align: 'center', name: 'description', label: 'Description', field: 'description' },
  { type: '', align: 'center', name: 'created_at', label: 'Created At', field: 'created_at' },
  { type: '', align: 'center', name: 'updated_at', label: 'Updated At', field: 'updated_at' },
  // { type: '', align: 'center', name: 'url', label: 'URL', field: 'url' },
  { type: '', align: 'center', name: 'photo_url', label: 'Photo', field: 'photo_url' },
  { align: 'center', name: 'actions', label: 'Actions', field: 'actions' }
];

const visibleColumns = [
  'actions',
  'id',
  'name',
  'description',
  'city',
  // 'photo_url',
  'tables',
  // 'created_at',
  // 'updated_at',
  // 'url',
  'address'
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
      toSearch: null,
      character: null
    }
  },
  mounted () {
    Loading.show();
    this.makeRequest();
  },
  computed: {
    getAlphabet () {
      const alpha = Array.from(Array(26)).map((e, i) => i + 65);
      const alphabet = alpha.map((x) => String.fromCharCode(x));

      return( alphabet );
    }
  },
  methods: {
    makeRequest () {
      this.$api.get( '/restaurants' )
      .then( ( response ) => {
        const restaurants = response.data

        // Assign response
        this.rows = restaurants;

        // Disable loading
        Loading.hide();
      } );
    },
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
      const url = `/restaurants/${this.idToDelete}`;

      // Delete of the system
      this.$api.delete( url )
        .then( ( response ) => {
          console.log( response );
          this.reloadPage();
        } );
    },
    reloadPage () {
      this.$router.push( '/' ).then( () => {
        this.$router.push( '/restaurants' );
      } );
    },
    onClickQuery () {
      const url = `/restaurants?city=${this.toSearch}`;

      this.$api.get( url )
        .then( ( response ) => {
          const restaurants = response.data

          // Assign response
          this.rows = restaurants;
        } );
    },
    searchFirstChar () {
      const url = `/restaurants?name=${this.character}`;

      this.$api.get( url )
        .then( ( response ) => {
          const restaurants = response.data

          // Assign response
          this.rows = restaurants;
        } );
    },
    clearChar () {
      if ( this.character ) {
        this.makeRequest();
      }

      this.character = null;
      this.toSearch = null;
    }
  }
}
</script>
