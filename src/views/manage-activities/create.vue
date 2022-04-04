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
                v-model="create_activitiy_payload.date"
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
          v-model="create_activitiy_payload.title"
          type="text"
          placeholder="Enter Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="create_activitiy_payload.description"
          placeholder="Enter Description"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Upload Image:" label-for="input-3">
        <b-form-file v-model="create_activitiy_payload.image" accept=".jpg, .png, .gif, .jpeg" class="mt-3"></b-form-file>
      </b-form-group>

      <b-button type="button"  variant="primary" @click="createActivity">Submit</b-button>
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
        create_activitiy_payload: {
            date: "",
            title: "",
            description: "",
            image: ""
      },
    }
  },

  mounted(){
     let todayDate = new Date();
      this.end_date = todayDate.toLocaleString("sv").substring(0, 10);
      let pastDate = new Date().setMonth(todayDate.getMonth());
      this.create_activitiy_payload.date = new Date(pastDate)
        .toLocaleString("sv")
        .substring(0, 10);
  },

  methods: {
    createActivity(){
      const form_data = new FormData();
      form_data.append("date", this.create_activitiy_payload.date);
      form_data.append("title", this.create_activitiy_payload.title);
      form_data.append("description", this.create_activitiy_payload.description);
      form_data.append("image", this.create_activitiy_payload.image);
      this.axios.post(apiEndPoints.apis.create_activity,form_data)
          .then(response => {
            console.log(response);
            this.$router.push({ name: "manage-activities" });
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
