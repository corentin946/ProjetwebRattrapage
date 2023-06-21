<!--tutorial display-->
<script setup>
import Modif from '../components/Modif.vue'
import Suppression from '../components/Suppression.vue'
</script>

<template>
  <main>
    <!--Title of the tutorial-->
    <h1>{{ tutos.titre }}</h1>
    <br>
    <!--video of the tutorial (uses the youtube api)-->
    <div v-html="tutos.lien" class="video"></div>
    <br>
    <!--Description of the tutorial-->
    <h3>Description du tutoriel :</h3>
    <p>{{ tutos.description }}</p><br>
    <div class="sep"></div>
    <!--Modification and/or deletion of the tutorial available if the 
      user is logged in and his id matches the id of the tutorial creator-->
    <div class="moderer" v-if="loggedIn && tutos.personne_id == id_user">
      <!--Modification of the tutorial-->
      <modif />
      <!--Deletion of the tutorial-->
      <suppression />
    </div>
  </main>
</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      tutos: [],
      //variable taking the value of the 'loggedIn' cookie
      loggedIn: Cookies.get('loggedIn') === 'true',
      //variable taking the value of the 'id' cookie
      id_user: Cookies.get('id')
    };

  },
  //method of retrieving data from server based on id
  mounted() {
    axios.get('http://localhost:3000/tuto/' + this.$route.params.id)
      .then(response => {
        this.tutos = response.data[0];
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>


<style scoped>

main {
  text-align: center;
}

h1 {
  color: aqua;
}

.moderer{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.sep {
  padding: 30px;
}

</style>
