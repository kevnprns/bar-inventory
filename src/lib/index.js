import axios from 'axios';

export default{

  baseUrl: 'http://24.138.161.30:5000',

  checkForToken() {
    var jwtAuth = localStorage.getItem("jwtAuth");
    if (jwtAuth) {
      console.log(jwtAuth);
      return true;
    }
    else {
      console.log("ERROR: No Authentification token found in localStorage");
      return false;
    }
  },
  getHeaders () {
    return {
      headers: { Authorization: "Bearer ".concat(localStorage.getItem('jwtAuth'))}
    }
  },
  getRequest (end_point, callback, error_callback=null) {
    // console.log(this.getHeaders());
      axios.get(this.baseUrl + end_point, this.getHeaders()).then(response => {
        callback(response)
      }).catch(e => {
        if (!error_callback) {
          // this.errors.push(e)
          console.log('request failed');
          console.log(e);
        } else {
          error_callback(e)
        }

      })
  },
  putRequest (end_point, payload, callback, error_callback=null) {
    axios.put(this.baseUrl + end_point, payload, this.getHeaders()).then(response => {
      callback(response)
    }).catch(e => {
      if (!error_callback) {
        // this.errors.push(e)
        console.log('request failed');
        console.log(e);
      } else {
        error_callback(e)
      }
    })
  },
  postRequest (end_point, payload, callback, error_callback=null) {
    axios.post(this.baseUrl + end_point, payload, this.getHeaders()).then(response => {
      callback(response)
    }).catch(e => {
      if (!error_callback) {
        // this.errors.push(e)
        console.log('request failed');
        console.log(e);
      } else {
        error_callback(e)
      }
    })
  },
  deleteRequest (end_point, callback, error_callback=null) {
    axios.delete(this.baseUrl + end_point, this.getHeaders()).then(response => {
      callback(response)
    }).catch(e => {
      if (!error_callback) {
        // this.errors.push(e)
        console.log('request failed');
        console.log(e);
      } else {
        error_callback(e)
      }
    })
  },

}
