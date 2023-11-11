<template>
  <nav>
    <div class="navigation">
      <ul>
        <li class="list active">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'scale-balanced']" />
            </span>
            <span class="text">الأكادمية</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'book']" />
            </span>
            <span class="text">ملازم</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'building-columns']" />
            </span>
            <span class="text">الكلية</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" />
            </span>
            <span class="text">تسجيل</span>
          </a>
        </li>
        <li class="list">
          <a href="#">
            <span class="icon">
              <font-awesome-icon :icon="['fas', 'user-plus']" />
            </span>
            <span class="text">جديد</span>
          </a>
        </li>
        <div class="indicator"></div>
      </ul>
    </div>
    <h1 class="name-logo">أكادمية الامام</h1>
    <img class="brand-logo" src="../assets/elemam_logo.png" alt="elemam" />
  </nav>
</template>
<script>
export default {
  name: "TheHeader",
  mounted() {
    const list = document.querySelectorAll(".list");

    function activeLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  direction: ltr;
}
:root {
  --clr: #222327;
  direction: ltr;
}

nav {
  display: flex;
  justify-content: space-around;
  direction: ltr;
}
.brand-logo {
  width: 200px;
  height: 200px;
  margin-top: 40px;
}
.name-logo {
  margin-top: 110px;
  font-weight: 800;
}
.navigation {
  margin-top: 70px;
  position: relative;
  width: 800px;
  height: 140px;
  background: #075e55;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}
.navigation ul {
  display: flex;
  width: 700px;
}
.navigation ul li {
  position: relative;
  list-style: none;
  width: 140px;
  height: 140px;
  z-index: 1;
}
.navigation ul li a {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-weight: 1000;
}
.navigation ul li a .icon {
  position: relative;
  display: block;
  line-height: 150px;
  font-size: 3em;
  text-align: center;
  transition: 0.5s;
  color: gold;
}
.navigation ul li.active a .icon {
  transform: translateY(-64px);
}
.navigation ul li a .text {
  position: absolute;
  color: #fff;
  font-weight: 800;
  font-size: 1.5em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  opacity: 0;
  transform: translateY(40px);
}
.navigation ul li.active a .text {
  opacity: 1;
  transform: translateY(20px);
}
.indicator {
  position: absolute;
  top: -50%;
  width: 140px;
  height: 140px;
  background: #222327;
  border-radius: 50%;
  border: 12px solid #fff;
  transition: 0.5s;
  float: left;
}
.indicator::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -44px;
  width: 40px;
  height: 40px;
  background: transparent;
  border-top-right-radius: 40px;
  box-shadow: 2px -20px 0 0 var(--clr);
}
.indicator::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -44px;
  width: 40px;
  height: 40px;
  background: transparent;
  border-top-left-radius: 40px;
  box-shadow: -2px -20px 0 0 #fff;
}

/* Indicator Transitions */
.navigation ul li:nth-child(1).active ~ .indicator {
  transform: translateX(calc(140px * 0));
}
.navigation ul li:nth-child(2).active ~ .indicator {
  transform: translateX(calc(140px * 1));
}
.navigation ul li:nth-child(3).active ~ .indicator {
  transform: translateX(calc(140px * 2));
}
.navigation ul li:nth-child(4).active ~ .indicator {
  transform: translateX(calc(140px * 3));
}
.navigation ul li:nth-child(5).active ~ .indicator {
  transform: translateX(calc(140px * 4));
}
</style>
