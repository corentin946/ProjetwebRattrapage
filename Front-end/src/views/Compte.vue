<!--User login and registration page-->
<script setup>
import Register from '../components/Register.vue'
import Identification from '../components/Identification.vue'
</script>

<template>
  <main>
    <!--User Login-->
    <identification />
    <div class="sep">
    </div>
    <!--Button to show or hide the registration form-->
    <button type="button" class="ajoutercompte" @click="afficher">S'inscrire</button>
    <div class="sep">
    </div>
    <div id="inscription" :style="{ display: isVisible ? 'block' : 'none' }">
      <!--User registration-->
      <Register />
    </div>
  </main>
</template>

<script>

export default {
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    //method to change the value of the boolean 'isVisible'
    afficher() {
      if (this.isVisible) {
        this.isVisible = false;
      }else{
        this.isVisible = true;
      }
    }
  }
}
</script>

<style scoped>

.sep {
  padding: 30px;
}

.ajoutercompte {
  margin-left: 45%;
  width: 10%;
  transition-duration: 0.8s;
  border-radius: 5px;
  font-size: 120%;
  min-width: 80px;
}

.ajoutercompte:hover {
  background-color: green;
  transition-duration: 0.3s;
}

</style>
