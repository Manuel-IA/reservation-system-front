<template>
  <div class="q-pa-md">
    <q-table
      title="Restaurants"
      row-key="name"
      :rows="rowsTest"
      :columns="columns"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top-right>
        <q-btn color="primary" icon="add_circle" label="Create Restaurant" @click="onCreate" />
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
        <div class="q-pa-md">
          <q-btn
            color="primary"
            label="Edit"
            icon="edit"
            no-caps
            @click="onEdit( props.row )"
          />
        </div>
      </template>
    </q-table>

    <!-- Dialog -->
    <q-dialog v-model="showInfo">

      <!-- Form type=create|edit -->
      <RestaurantForm
        v-if="formCreate"
        type="create"
        title="Restaurant"
        :fields="columns"
      />
      <RestaurantForm
        v-else
        type="edit"
        :title="productToShow.name"
        :fields="columns"
        :item="productToShow"
        :acceptedFields="[ 'name', 'city', 'tables', 'description', 'address' ]"
      />
    </q-dialog>
  </div>
</template>

<script>
import { Loading } from 'quasar'
import RestaurantForm from 'src/components/Form.vue'

const columns = [
  { align: 'center', name: 'id', label: 'ID', field: 'id' },
  { align: 'center', name: 'name', label: 'Restaurant Name', field: 'name' },
  { align: 'center', name: 'city', label: 'City', field: 'city' },
  { type: 'number', align: 'center', name: 'tables', label: 'Tables', field: 'tables' },
  { type: '', align: 'center', name: 'address', label: 'Address', field: 'address' },
  { type: 'textarea', align: 'center', name: 'description', label: 'Description', field: 'description' },
  { type: '', align: 'center', name: 'created_at', label: 'Created At', field: 'created_at' },
  { type: '', align: 'center', name: 'updated_at', label: 'Updated At', field: 'updated_at' },
  { type: '', align: 'center', name: 'url', label: 'URL', field: 'url' },
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
  'created_at',
  'updated_at',
  'url',
  'address'
];

export default {
  components: {
    RestaurantForm
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
      productToShow: {},
      rowsTest: [
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 24, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 26, name: 'Bufalo Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 37, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 23, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 67, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 49, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 94, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 98, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 87, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 51, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' },
        { id: 25, name: 'American Burger', description: ' This is a restaurant', city: 'Ibague', photo_url: 'aaa', tables: 65, created_at: '2023-05-03', updated_at: '2023-05-03', url: 'aaaaaaaaa', address: 'Cr 6 cll 40' }
      ]
    }
  },
  /*
  mounted () {
    Loading.show()
    this.$api.get( '/restaurants.json' )
      .then( ( response ) => {
        let products = response.data

        // Sort array
        // products = this.sortBy( products, 'a-z' )

        // Assign sorted array
        this.rows = products

        // Disable loading
        Loading.hide()
      } )
  },*/
  methods: {
    onEdit ( productInfo ) {
      this.productToShow = productInfo;
      this.showInfo = true;
    },
    onCreate () {
      this.showInfo = true;
      this.formCreate = true;
    }
  }
}
</script>
