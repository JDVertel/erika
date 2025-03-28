<template>
  <footer>
<!--     <br />
      <a class="navbar-brand" href="#">
        <router-link to="/dashboard"><i class="bi bi-house-fill"></i></router-link>    <p>&copy; Bitdata Managements 2025</p>
      </a> -->

      <nav class="navbar">
        <div class="container-fluid">
          
          <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link> 
          <a class="navbar-brand" >@BitData Managements 2025</a>
       
      
        </div>
      </nav>
  </footer>

  
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.navbar {
  position: fixed;
  height: 50px;
  bottom: 0;
  width: 100%;
  background-color: #34836e;
  text-shadow: 1px 0px 0px color black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  

}
a{
  text-decoration: none;
  color: #ffffff;
}

</style>
