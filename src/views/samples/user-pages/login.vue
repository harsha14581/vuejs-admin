<template lang="html">

  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                <form action="#">
                  <div class="form-group">
                    <label class="label">Email id</label>
                    <div class="input-group">
                      <input v-model="credentials.email_id" type="text" class="form-control" placeholder="Email Id">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Password</label>
                    <div class="input-group">
                      <input  v-model="credentials.password" type="password" class="form-control" placeholder="*********">
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="mdi mdi-check-circle-outline"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary submit-btn btn-block" type="button" @click="login">Login</button>
                  </div>
                  <div class="text-block text-center my-3">
                    <span class="text-small font-weight-semibold">Not a member ?</span>
                    <a href="register.html" class="text-black text-small">Create new account</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>

</template>

<script>

import apiEndPoints from "../../../apiEndPoints";

export default {
  name: 'login',

  data() {
    return {
      credentials: {
        email_id: "",
        password: ""
      }
    }
  },

  methods: {
    login() {
       this.axios.post(apiEndPoints.apis.login,this.credentials)
          .then(response => {
            console.log(response);
            let data = response.data;
            $cookies.set("user", data.data[0], 0);
            this.$router.push({ name: "dashboard" });
          })
          .catch(err => {
            console.log(err)
          });
    }
  }
}
</script>

<style scoped lang="scss">
.login {

}
</style>
