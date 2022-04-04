<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Global Activity List</h2>
             <b-button variant="primary" class="btn-fw" @click="navigateToCreateActivityPage"><i class="mdi mdi-account-plus"></i>Create Activity</b-button>
            <b-table striped hover responsive :fields="fields" :items="items" show-empty>
            <template v-slot:cell(image)="row">
                <img class="img-fluid" style="width:10%;"  :src="row.item.image"/>            
            </template>
             <template v-slot:cell(actions)="row">
                <b-button variant="info" @click="navigateToUpdateActivityPage(row)"><i class="mdi mdi-lead-pencil"></i></b-button>
                <b-button variant="danger" @click="openActivityDeleteModal(row)" ><i class="mdi mdi-delete"></i></b-button>
            </template>
                
            </b-table>
          </div>
        </div>
      </div>
    </div>

   <div>
        <b-modal id="delete-activity-modal" title="Delete Activity">
            <p class="my-4">Are you user you want to delete activity?</p>
            <template #modal-footer="{ ok, cancel, hide }">
                <b-button size="sm" variant="primary" @click="deleteActivity()">
                    submit
                </b-button>
                <b-button size="sm" variant="danger" @click="cancel()">
                    Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
  </section>

</template>

<script>

import apiEndPoints from "../../apiEndPoints";

export default {
  name: 'basicTables',
  data () {
    return {
      row: {},
      items: [],
      fields: [
        { key: "date"},
        { key: "title" },
        { key: "description"},
        { key: "image", label: "Images" },
        { key: "actions", label: "Actions" }
      ]
    }
  },

  mounted(){
    this.getActivities();
    this.getUsers();
  },

  methods:{

     getActivities(){
       this.axios.get(apiEndPoints.apis.get_activities)
          .then(response => {
            this.items = response.data.data;
            console.log(this.items);
          })
          .catch(err => {
            console.log(err)
          });
     },

      navigateToCreateActivityPage(){
          this.$router.push({ 'name': 'manage-activities-create'})
      },

      navigateToUpdateActivityPage(row){
        console.log('here');
        this.$router.push({ 'name': 'manage-activities-update', params: { activityId: row.item.id }})
      },

       openActivityDeleteModal(row){
          this.row = row.item;
          this.$root.$emit('bv::show::modal', 'delete-activity-modal')
      },

      deleteActivity(){
           this.axios.post(apiEndPoints.apis.delete_activity, {
               id: this.row.id
           })
          .then(response => {
              this.$root.$emit('bv::hide::modal', 'delete-activity-modal')
              this.getActivities();
          })
          .catch(err => {
            console.log(err)
          });
      }
  }
}
</script>

<style scoped lang="scss">
.tables {
}
</style>
