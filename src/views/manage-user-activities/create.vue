<template lang="html">

  <div>
    <b-form-group  id="input-group-1" label="Please Select User" label-for="input-1">
        <b-form-select v-model="selected_user" :options="usernames" size="sm" class="mt-3"></b-form-select>
    </b-form-group>
     <b-form-group  id="input-group-1" label="Please Select Activity" label-for="input-1">
        <b-form-select v-model="selected_activity" :options="activities" size="sm" class="mt-3"></b-form-select>
    </b-form-group>

      <b-button type="button"  variant="primary" @click="createUserActivity">Submit</b-button>
      <b-button type="reset"  variant="danger">Reset</b-button>
    </b-form>
  </div>

 
</template>

<script lang="js">
import apiEndPoints from "../../apiEndPoints";

export default {
  name: 'basicTables',
  data () {
    return {
        usernames: [],
        activities: [],
        selected_activity: "",
        selected_user: ""
    }
  },

  mounted(){
    this.getUserNames();
    this.getActivityList();
  },

  methods: {

    getUserNames(){
        this.axios.get(apiEndPoints.apis.get_user_names)
          .then(response => {
            let usernames = response.data.data;
            usernames.forEach((value) => {
                console.log(value)
                this.usernames.push({
                    value: value.id,
                    text: value.name
                })
            })
          })
          .catch(err => {
            console.log(err)
          });
    },

    getActivityList(){
         this.axios.get(apiEndPoints.apis.get_activity_list)
          .then(response => {
            let activities = response.data.data;
            activities.forEach((value) => {
                console.log(value)
                this.activities.push({
                    value: value.id,
                    text: value.title
                })
            })
          })
          .catch(err => {
            console.log(err)
          });
    },
    
    createUserActivity(){
      this.axios.post(apiEndPoints.apis.create_user_activity,{
          user_id: this.selected_user,
          activity_id: this.selected_activity
      }).then(response => {
            this.$router.push({ name: "manage-user-activities" });
          })
          .catch(err => {
            console.log(err)
          });
    }
  }
}
</script>

<style scoped lang="scss">
.vdpComponent > input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
}
.vdpComponent > input {
  padding: 0.375rem 0.75rem;
  height: calc(1.5em + 0.75rem + 2px);
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 100%;
}
.vdpClearInput {
  display: none;
}
.vdpComponent.vdpWithInput > input {
  padding-right: 0px;
}
.vdpOuterWrap.vdpFloating {
  z-index: 1000;
}
</style>
