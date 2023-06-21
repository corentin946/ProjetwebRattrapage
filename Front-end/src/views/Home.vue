<!--Home page-->
<script setup>
import Description from '../components/Description.vue'
import Choix from '../components/Choix.vue'
</script>

<template>
  <main>
    <!--paragraph explaining the usefulness of the site-->
    <description />
    <div class="sep">
    </div>
    <!--list of tutorials available-->
    <choix />
  </main>
</template>


<style scoped>

.sep {
  padding: 30px;
}

</style>
