<!--tutorial creation form-->
<template>
  <main>
    <div class="formulaire">
      <h1>Création de votre tutoriel</h1>
      <form @submit.prevent="submitForm">

        <div class="valeurs">
          <div>
            <label for="Titre">Titre de votre tutoriel :</label>
            <input type="text" id="Titre" v-model="form.titre" required>
          </div>
          <div>
            <label for="lien">Lien de votre tutoriel :</label>
            <input type="text" id="lien" v-model="form.lien" required>
          </div>
          <div>
            <label for="description">Description de votre tutoriel :</label>
            <input type="text" id="description" v-model="form.description" required>
          </div>
        </div>
        <button type="submit">Terminer</button>
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
        personne_id: Cookies.get('id'),
        description: ''
      }
    };
  },
  methods: {
    //method sending the form data to the server
    submitForm() {
      //configuration of the token so that the server identifies the creator of the tutorial in a secure way
      const config = {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
        }
      };
      axios.post('http://localhost:3000/tuto/new',
        this.form,
        config)
        //returns to the home page once the event is successful
        .then(response => {
          window.history.back();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>



<style scoped>

main {
  text-align: center;
}

h1 {
  color: aqua;
}

.formulaire {
  font-size: 120%;
}

input {
  margin-top: 30px;
  width: 60%;
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


</style>
