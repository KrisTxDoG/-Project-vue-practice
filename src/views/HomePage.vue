<template>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <img src="image/Hope-removebg-preview.png">
          <a class="navbar-brand fs-1" href="#">The Hope</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse ms-auto" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    <div>
      <div class="m-5 text-center align-middle">
        <div  id="carouselExampleControls" class="carousel slide w-25 mx-auto" data-bs-ride="carousel">
          <div class="carousel-inner align-middle">
            <div class="carousel-item active">
              <img :class="img-fluid" src="image/哨所-1.jpg" class="d-block img-fluid w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="image/哨所-2.jpg" class="d-block img-fluid w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="image/哨所-3.jpg" class="d-block img-fluid w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-5 mt-5">
          <i class="bi bi-geo-alt-fill"></i>
          <router-link class="fs-1 text-black text-decoration-none" to="/mapComponent">進入台灣地圖</router-link>
          <br>
          <router-link class="fs-1 text-black text-decoration-none" to="/axios">進入 axios 呼叫</router-link>
        </div>
        <div class="col-6">
          <img src="image/山林瀑布.jpg" alt="">
        </div>
      </div>
    </div>
    

  </template>
  
  <script>
  export default {
    name: 'HomePage',
    // 監聽路由路徑
    created() {
      console.log('HomePage created');
    }
  }

  </script>
  
  <style>
  /* Your styles here */

  .homeStyle {
    background-color: green;
    color: white;
  }


  </style>
  