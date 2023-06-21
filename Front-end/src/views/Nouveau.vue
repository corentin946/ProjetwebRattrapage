<!--tutorial creation page-->
<script setup>
import Creation from '../components/Creation.vue'
</script>

<template>
  <main>
    <!--tutorial creation form-->
    <creation />
  </main>
</template>


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
}

.ajoutercompte:hover {
  background-color: green;
  transition-duration: 0.3s;
}

</style>
