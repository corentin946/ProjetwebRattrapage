<!--Header present on all pages-->
<template>
  <div class="topnav">

    <img class="image_imc" src="../assets/horloge.jpg" alt="Horloge citron">

    <router-link to='/' class="title">
      <h1>Time To Eat</h1>
    </router-link>
    <!--login button displayed if the user is not logged in-->
    <router-link v-if="!loggedIn" type="button" to="/compte" class="boutton">Sign-in</router-link>
    <!--logout button displayed if the user is logged in-->
    <div v-if="loggedIn" class="connecte">
      <button @click="logout" class="boutton">Sign-out</button>
      <!--display of the name of the person connected-->
      <p>{{ nom }}</p>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      loggedIn: Cookies.get('loggedIn') === 'true',
      nom: Cookies.get('nom'),
      prenom: Cookies.get('prenom'),
    };
  },
  methods: {
    logout() {
      //deletion of cookies when the user logs out
      Cookies.remove('loggedIn');
      Cookies.remove('prenom');
      Cookies.remove('nom');
      Cookies.remove('id');
      Cookies.remove('token');

      //Resetting the login variable and redirecting the user to the home page
      this.loggedIn = false;
      window.location.href = '/';
    }
  }
}


</script>

<style scoped>


.topnav {
  padding-top : 25px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  border-color: white;
  font-size: 150%;
  background-color: #333;
}

.title {
  width: 70%;
  color: green;
  text-align: center;
  text-decoration: none;
}

.boutton {
  width: 10%;
  color: white;
  background-color: black;
  font-size: 100%;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition-duration: 0.5s;
  min-width: 100px;
  cursor:pointer;
}

.boutton:hover {
  background-color: green;
  transition-duration: 0.3s;
}


img {
  width: 8%;
  margin-left: 7%;
  max-width: 70px;
}

.connecte{
  text-align: center;
}

</style>
