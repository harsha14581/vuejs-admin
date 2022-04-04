<template lang="html">

  <div>
    <b-form>

      <b-form-group
        id="input-group-1"
        label="Please select activity Date:"
        label-for="input-1"
      >
             <!-- <b-form-input> -->
              <date-pick
                v-model="update_activitiy_payload.date"
                :inputAttributes="{ readonly: true }"
              ></date-pick>
            <!-- ></b-form-input> -->
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="update_activitiy_payload.title"
          type="text"
          placeholder="Enter Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="update_activitiy_payload.description"
          placeholder="Enter Description"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Upload Image:" label-for="input-3">
        <img class="img-fluid" style="width:10%;"  :src="update_activitiy_payload.image"/>    
        <b-form-file v-model="image" accept=".jpg, .png, .gif, .jpeg" class="mt-3"></b-form-file>
      </b-form-group>

      <b-button type="button"  variant="primary" @click="updateActivity">Submit</b-button>
      <b-button type="reset"  variant="danger">Reset</b-button>
    </b-form>
  </div>

 
</template>

<script lang="js">

import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import apiEndPoints from "../../apiEndPoints";

export default {
  name: 'basicTables',
   components: {DatePick},
  data () {
    return {
        update_activitiy_payload: {},
        image: null
    }
  },

  mounted()
  {
      this.getUserActivity();
  },

  methods: {

    getUserActivity(){
        this.axios.get(apiEndPoints.apis.get_user_activities,{ params: {
            id: this.$route.params.id
        }})
          .then(response => {
              console.log(response.data.data)
             this.update_activitiy_payload = response.data.data;
          })
          .catch(err => {
            console.log(err)
          });
    },

    updateActivity(){
      const form_data = new FormData();
      form_data.append("id", this.$route.params.id);
      form_data.append("user_id", this.$route.params.userId);
      form_data.append("title", this.update_activitiy_payload.title);
      form_data.append("description", this.update_activitiy_payload.description);
      if(this.image){
          form_data.append("image", this.image);
      }
      this.axios.post(apiEndPoints.apis.update_user_activity,form_data)
          .then(response => {
            console.log(response);
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
