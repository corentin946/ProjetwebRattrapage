<!--popup redirecting to the home page without loading (using router-link)-->
<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <br>
      <router-link type="button" to="/" class="popup-close">OK</router-link>
    </div>
  </div>
</template>

<style scoped>

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  border-radius: 15px;
  border-inline: 2px solid beige;
  border-block: 2px solid beige;;
  background-color: black;
  padding: 32px;
}

.popup-close {
  border-radius: 5px;
  transition-duration: 0.8s;
  font-size: 120%;
  color: black;
  background-color: white;
  text-decoration: none;
  padding: 3px;
}

.popup-close:hover{
  background-color: green;
  transition-duration: 0.3s;
}
</style>