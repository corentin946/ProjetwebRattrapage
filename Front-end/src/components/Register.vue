<!--Registration Form-->
<script setup>
import Popup from './Popup.vue'
</script>

<template>
  <div class="formulaire">
    <h2>Créer un compte</h2>
    <form @submit.prevent="submitForm">
      <div class="info">
        <div>
          <label for="prenom">Prénom :</label>
          <input type="text" id="prenom" v-model="form.prenom" required>
        </div>
        <div>
          <label for="nom">Nom :</label>
          <input type="text" id="nom" v-model="form.nom" required>
        </div>
      </div>
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
      <button type="submit">Créer le compte</button>
    </form>
    <!--display of the popup indicating the success of the creation of the account-->
    <popup v-if="showPopup" @close="showPopup = false">
      <p>Votre compte a bien été créé !</p>
    </popup>
    <!--display of the popup indicating the failure of the account creation-->
    <popup v-if="showPopup2" @close="showPopup2 = false">
      <p>L'adresse mail que vous avez choisis exsiste déjà.<br>Veuillez en changer.</p>
    </popup>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      form: {
        prenom: '',
        nom: '',
        email: '',
        mot_de_passe: '',
      },
      //variable allowing to display or not the success popup
      showPopup: false,
      //variable allowing to display or not the failure popup
      showPopup2: false,
    };
  },
  methods: {
    //method sending the form data to the server
    submitForm() {
      axios.post('http://localhost:3000/connection/register',
        this.form)
        .then(response => {
          //success popup display
          this.showPopup = true;
        })
        .catch(error => {
          //failure popup display
          this.showPopup2 = true;
          console.log(error);
        });
    }
  }
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

.info{
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
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