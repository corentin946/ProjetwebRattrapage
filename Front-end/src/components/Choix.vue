<!--list of available tutorials and access to the tutorial creation page-->
<template>
  <div class="table">
    <h2>Liste des tutoriels</h2>
    <table>
      <thead>
        <tr>
          <th>Titre du tutoriel</th>
        </tr>
      </thead>
      <tbody>
        <!--loop to display all the tutorials available as links-->
        <li v-for="tuto in tutos" :key="tuto.id"><a :href="tuto.id">{{ tuto.titre }}</a></li>
      </tbody>
      <!--button leading to the tutorial creation page displayed only if the user is logged in-->
      <router-link v-if="loggedIn" to='/nouveau'><button type="button" class="ajout">+</button></router-link>
    </table>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  data() {
    return {
      tutos: [],
      //variable taking the value of the 'loggedIn' cookie
      loggedIn: Cookies.get('loggedIn') === 'true',
    };
  },
  //server data recovery method
  mounted() {
    axios.get('http://localhost:3000/tuto')
      .then(response => {
        this.tutos = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>

<style scoped>

.table{
  font-size: 150%;
  text-align: center;
}

a {
  color: green;
}

table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

li {

  padding-top: 10px;
  text-align: center;
  list-style: none;
}

h2 {
  color: aqua;
}

.ajout {
  border:green 2px solid;
  margin:2px;
  font-size:24px;
  cursor:pointer;
  width:50px;
  height:50px;
  border-radius:50%;
  margin-top: 20px;
  transition-duration: 0.5s;
}

.ajout:hover {
  background-color: green;
  transition-duration: 0.3s;
}

</style>