<script setup>
import Entete from './components/Entete.vue'
import Pied from './components/Pied.vue'
</script>


<template>
  <!--Header present on all pages-->
  <entete />
  <div class="sep1">
  </div>
  <!--button to return to the previous page-->
  <button type="button" class="retour" @click="retour">Retour</button>
  <div class="sep2">
  </div>
  <router-view></router-view>
  <div class="sep">
  </div>
  <!--Footer present on all pages-->
  <pied />
</template>

<script>
//return to the previous page
function retour(){
  window.history.back();
}
</script>

<style scoped>


.sep {
  padding: 30px;
}

.sep1 {
  padding: 15px;
}
.sep2 {
  padding: 10px;
}

.retour {
  margin-left: 10%;
  transition-duration: 0.5s;
  border-radius: 5%;
  cursor:pointer;
}

.retour:hover {
  background-color: aqua;
  transition-duration: 0.3s;
}

</style>
