<!--Authentication form-->
<script setup>
import Popup from './Popup.vue'
import Popup2 from './Popup2.vue'
</script>

<template>
  <div class="formulaire">
    <h2>Se connecter</h2>
    <form @submit.prevent="submitForm">

      <div class="connect">
        <div>
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div>
          <label for="mot_de_passe">Mot de passe :</label>
          <input type="password" id="mot_de_passe" v-model="form.mot_de_passe" required>
        </div>
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <!--display of the popup indicating the success of the account connection-->
    <popup2 v-if="showPopup" @close="showPopup = false">
      <p>Vous êtes bien connecté en tant que : <br>
        {{ this.utilisateur.prenom }} {{ this.utilisateur.nom }}</p>
    </popup2>
    <!--display of the popup indicating the failure of the account connection-->
    <popup v-if="showPopup2" @close="showPopup2 = false">
      <p>Mot de passe ou adresse mail incorrect !</p>
    </popup>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from 'js-cookie';

export default {

  data() {
    return {
      form: {
        email: '',
        mot_de_passe: '',
      },
      //variable allowing to display or not the success popup
      showPopup: false,
      //variable allowing to display or not the failure popup
      showPopup2: false,
      loggedIn: false,
      utilisateur: {
        prenom: '',
        nom: '',
      }
    };
  },
  methods: {
    //method sending the form data to the server
    submitForm() {
      axios.post('http://localhost:3000/connection', this.form)
        .then(response => {
          //Check if the connection is successful
          if (response.status === 200) {
            this.utilisateur.prenom = response.data.prenom;
            this.utilisateur.nom = response.data.nom;
            //success popup display
            this.showPopup = true;
            //creation of cookies to keep in mind that the user is connected
            Cookies.set('loggedIn', true, { sameSite: 'Lax' });
            Cookies.set('prenom', response.data.prenom, { sameSite: 'Lax' });
            Cookies.set('nom', response.data.nom, { sameSite: 'Lax' });
            Cookies.set('id', response.data.id, { sameSite: 'Lax' });
            Cookies.set('token', response.data.token, { sameSite: 'Lax' })
          } else {
            //failure popup display
            this.showPopup2 = true;
          }
        })
        .catch(error => {
          //failure popup display
          this.showPopup2 = true;
          console.error(error);
        });
    }
  },
};
</script>

<style scoped>

.formulaire {
  font-size: 120%;
  text-align: center;
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
}

button:hover{
  background-color: green;
  transition-duration: 0.3s;
}

.connect {
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
}

h2 {
  color: aqua;
}

</style>