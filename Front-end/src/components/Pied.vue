<!--Footer present on all pages-->
<template>
    <footer>
        <p>Tout droits réservés © 2023</p>
        <br>
        <div class="logo_pied">
            <a class="fb" href="https://www.facebook.com/MetaFrance/"> <img src="../assets/facebook.webp"
                    alt="icon facebook" class=logo></a>
            <a class="twitter" href="https://twitter.com/?lang=fr"> <img src="../assets/twitter.webp" alt="icon twitter"
                    class=logo></a>
            <a class="instagram" href="https://www.instagram.com/?hl=fr"> <img src="../assets/instagram.webp"
                    alt="icon instagram" class=logo></a>
        </div>
    </footer>
</template>

<style scoped>

footer{
    background-color: #333;
    position: absolute;
    width: 100%;
    text-align: center;
}

.logo_pied{
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 12px;
}

.logo {
    width: 50px;
    border-radius: 20%;
    transition-duration: 0.1s;
}

.logo:hover {
    transform: scale(1.5);
    transition-duration: 0.1s;
}

</style>