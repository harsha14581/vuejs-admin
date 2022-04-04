<template lang="html">

  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">User Activity List</h2>
             <b-button variant="primary" class="btn-fw" @click="navigateToCreateUserActivityPage"><i class="mdi mdi-account-plus"></i>Create UserActivity</b-button>
            <b-table striped hover responsive :fields="fields" :items="items" show-empty>
              <template v-slot:cell(name)="row">
                <td>{{ row.item.user.name }}</td>            
            </template>
            <template v-slot:cell(image)="row">
                <img class="img-fluid" style="width:10%;"  :src="row.item.image"/>            
            </template>
             <template v-slot:cell(actions)="row">
                <b-button variant="info" @click="navigateToEditActivityPage(row)" ><i class="mdi mdi-lead-pencil"></i></b-button>
                <b-button variant="danger" @click="openUserActivityDeleteModal(row)" ><i class="mdi mdi-delete"></i></b-button>
            </template>
                
            </b-table>
          </div>
        </div>
      </div>
    </div>

    <div>
        <b-modal id="delete-user-activity-modal" title="Delete User Activity">
            <p class="my-4">Are you user you want to delete activity?</p>
            <template #modal-footer="{ ok, cancel, hide }">
                <b-button size="sm" variant="primary" @click="deleteUserActivity()">
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
      users: [],
      items: [],
      row: {},
      fields: [
        { key: "name" },
        { key: "date" },
        { key: "title" },
        { key: "description"},
        { key: "image", label: "Images" },
        { key: "actions", label: "Actions" }
      ]
    }
  },

  mounted(){
    this.getUserActivities();
  },

  methods:{

     getUserActivities(){
       this.axios.get(apiEndPoints.apis.get_user_activities)
          .then(response => {
            this.items = response.data.data;
            console.log(this.items)
          })
          .catch(err => {
            console.log(err)
          });
     },

    navigateToCreateUserActivityPage(){
        this.$router.push({ 'name': 'manage-user-activities-create'})
    },

      navigateToEditActivityPage(row){
          this.$router.push({ 'name': 'manage-user-activities-edit', params: { id: row.item.id, userId: row.item.user_id } })
      },

      openUserActivityDeleteModal(row){
          this.row = row.item;
          this.$root.$emit('bv::show::modal', 'delete-user-activity-modal')
      },

      deleteUserActivity(){
          console.log(this.row)
           this.axios.post(apiEndPoints.apis.delete_user_activity, {
               id: this.row.id,
               user_id: this.row.user_id
           })
          .then(response => {
              this.$root.$emit('bv::show::hide', 'delete-user-activity-modal')
              this.getUserActivities();
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
