<!--Modification of the tutorial-->
<template>
  <main>
    <!--button displaying the tutorial modification form-->
    <button type="button" class="affichageModif" @click="cacher">Modifier le tutoriel</button>
    <div class="esp"></div>
    <div class="formulaire" :style="{ display: isVisible ? 'block' : 'none' }">
      <h2>Modifier les valeurs</h2>
      <form @submit.prevent="submitForm">
        <div class="valeurs">
          <div>
            <label for="Titre">Titre :</label>
            <input type="text" id="Titre" v-model="form.titre" required>
          </div>
          <div>
            <label for="lien">Lien :</label>
            <input type="text" id="lien" v-model="form.lien" required>
          </div>
          <div>
            <label for="description">Description :</label>
            <input type="text" id="description" v-model="form.description" required>
          </div>
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  </main>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        titre: '',
        lien: '',
        //variable taking the value of the 'id' cookie
        personne_id: Cookies.get('id'),
        description: ''
      },
      isVisible: false
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
    //method sending the form data to the server
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
      axios.put('http://localhost:3000/tuto/put',
        this.form,
        req_param)
        //reload the actual page once the event is successful
        .then(response => {
          window.location.reload()
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>

h1 {
  color: aqua;
}

.formulaire {
  font-size: 120%;
}

input {
  margin-top: 20px;
}

input:invalid {
  border-bottom: red solid 3px;
} 

input:valid {
  border-bottom:green solid 3px;
}

button {
  border-radius: 5px;
  margin-top: 20px;
  transition-duration: 0.8s;
  font-size: 120%;
  margin-left: 8%;
}

button:hover{
  background-color: green;
  transition-duration: 0.3s;
}

.esp {
  padding-top: 15px;
}

</style>
