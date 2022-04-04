import axios from "axios";
import Vue from "vue";
import router from "./src/router/index";

export default {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
};
axios.interceptors.request.use(
  config => {
    if ($cookies.isKey("user")) {
      let user = $cookies.get("user");
      console.log(user)
      config.headers.common["Authorization"] = "Bearer " + user.access_token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    console.log(error)
    const self = new Vue();
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          alert(error.response.data.message);
          $cookies.remove("user");
          router.replace({ name: "Login" });
          break;

        case 500:
          alert("Something went wrong.", "danger");
          break;
      }
      return Promise.reject(error.response);
    }
  }
);
