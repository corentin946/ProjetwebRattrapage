<!--Deletion of the tutorial-->
<template>
  <main class="poursuprr">
    <!--button displaying the tutorial deletion form-->
    <button type="button" class="suppression" @click="cacher">Supprimer le tutoriel</button>
    <div class="esp"></div>
    <div class="formulaire" :style="{ display: isVisible ? 'block' : 'none' }">
      <h2>Supprimer le tutoriel ?</h2>
      <form @submit.prevent="submitForm">

        <div class="result">
          <div>
            <!--button to permanently delete the tutorial-->
            <button type="submit" class="accept">Oui</button>
          </div>
          <div>
            <!--button to cancel the deletion of the tutorial and hides the deletion form-->
            <button type="button" class="refuse" @click="cacher">Non</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    //method to change the value of the boolean 'isVisible'
    cacher() {
      if (this.isVisible) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
    //method to send the tutorial deletion request to the server from the id
    submitForm() {
      //configuration of the token so that the server identifies the creator of the tutorial in a secure way
      var req_param = {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token')
        },
        params: {
          id: this.$route.params.id
        }
      }
      axios
        .delete('http://localhost:3000/tuto/del',
          req_param
        )
        //returns to the home page once the event is successful
        .then(response => {
          window.location.href = '/';
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>


<style scoped>

.formulaire {
  font-size: 120%;
}

button {
  border-radius: 5px;
  margin-top: 20px;
  transition-duration: 0.8s;
  font-size: 120%;
  margin-left: 8%;
}

.accept:hover{
  background-color: red;
  transition-duration: 0.3s;
}

.refuse:hover{
  background-color: green;
  transition-duration: 0.3s;
}

.result {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.suppression:hover {
  background-color: green;
  transition-duration: 0.3s;
}

.esp {
  padding-top: 15px;
}

</style>
