<template>
<<<<<<< HEAD
  <div class="Header border-b border-gray-300">
    <div class="container flex justify-between items-center gap-2.5">
      <div class="logo">
        <router-link to="/" class="flex items-center gap-2.5">
          <img
            src="../assets/elemam_logo.png"
            alt="أكاديمية الإمام القانونية"
            class="h-24"
          />
          <span>أكاديمية الإمام القانونية</span>
        </router-link>
      </div>
      <div class="left flex items-center gap-2.5 flex-wrap">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        <div class="links relative">
          <span
            @click="ShowLinks"
            class="click flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
          >
            <span>روابط هامة</span>
            <font-awesome-icon :icon="['fas', 'caret-down']" />
          </span>
          <div
            class="all_links hidden flex flex-col gap-2.5 absolute bg-[#eee] top-14 w-96 rounded p-2.5"
          >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >تعريف عن الأكاديمية</span
            >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >نبذة عن كلية الشريعة و القانون</span
            >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >الفرق الدراسية</span
            >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >الإختبارات</span
            >
            <span class="cursor-pointer">تواصل معنا</span>
          </div>
        </div>
        <div
          class="login flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
          v-if="!UserState"
          @click="close_1"
        >
          <font-awesome-icon :icon="['fas', 'user-lock']" />
          <span>تسجيل دخول</span>
        </div>

        <div class="Sign_In">
          <div v-if="UserState" style="position: relative">
            <div
              class="User_Logo bg-[--main-color] h-10 w-10 text-white rounded-full flex justify-center items-center cursor-pointer"
              @click="State"
            >
              {{ firstLetters }}
            </div>
            <div class="user" v-if="state">
              <div>أهلا {{ thetype }} {{ UserName }}</div>
              <div class="email">{{ useremail }}</div>
              <div class="add" @click="close_modal_2">تغيير كلمة السر</div>
              <div class="add" @click="close_modal_3">
                <router-link to="/TheUser"> حسابي </router-link>
              </div>
              <div class="add" v-if="Mosalem_Admin" @click="close_modal_3">
                إضافة المشرفين
              </div>
              <div class="add" v-if="Mosalem_Admin" @click="close_modal_4">
                إدارة المشرفين
              </div>
              <div class="add" v-if="Mosalem_Admin" @click="close_modal_5">
                طلبات التبرع
              </div>
              <div @click="SignOut">
                <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" />
                <span>تسجيل خروج</span>
              </div>
            </div>
            <div
              class="main_popup bg-transparent"
              v-if="state"
              @click="State"
            ></div>
          </div>
        </div>

        <div
          class="registr flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
          v-if="!UserState"
          @click="close_2"
        >
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          <span>حساب جديد</span>
        </div>
      </div>
    </div>
  </div>
  <SignIn @close_1="close_1" v-if="close_1_State" />
  <TheRegister @close_2="close_2" v-if="close_2_State" />
=======
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
>>>>>>> f5e3c3461ecd505a541f7bae8a902a7911069ffd
</template>
<script>
import SignIn from "./SignIn.vue";
import TheRegister from "./TheRegister.vue";
export default {
  name: "TheHeader",
<<<<<<< HEAD
  data() {
    return {
      UserState: null,
      state: null,
      close_1_State: null,
      close_2_State: null,
      firstLetters: "",
      UserName: "",
      UserEmail: "",
      ShowHelloUser: null,
      thetype: "",
    };
  },
  components: {
    SignIn,
    TheRegister,
  },
  mounted() {
    this.UserStateFunction();
  },
  methods: {
    State() {
      this.state = !this.state;
    },
    close_1() {
      this.close_1_State = !this.close_1_State;
      this.UserStateFunction();
    },
    close_2() {
      this.close_2_State = !this.close_2_State;
      setTimeout(() => {
        this.UserStateFunction();
      }, 100);
    },
    SignOut() {
      localStorage.removeItem("username_1");
      localStorage.removeItem("username_2");
      localStorage.removeItem("username_3");

      localStorage.removeItem("useremail");
      localStorage.removeItem("userphone");
      localStorage.removeItem("userid");
      localStorage.removeItem("college_place");
      localStorage.removeItem("parents_phone");
      localStorage.removeItem("UserState");
      this.state = null;
      setTimeout(() => {
        this.UserStateFunction();
      }, 10);
    },
    UserStateFunction() {
      console.log("UserStateFunction");
      this.state = null;
      this.thetype =
        localStorage.getItem("type") === "بنين" ? "بك يا" : "بيكي يا";
      this.UserName = `${localStorage.getItem("username_1")} 
        ${localStorage.getItem("username_2")} 
        ${localStorage.getItem("username_3")}`;
      localStorage.setItem(
        "UserState",
        localStorage.getItem("username_1") ? true : false
      );
      this.UserState = localStorage.getItem("username_1") ? true : false;
      if (this.UserState) {
        var words = this.UserName.split(" ");
        this.firstLetters = words
          .slice(0, -1)
          .map(function (word) {
            return word.charAt(0);
          })
          .join(" ");
      }
    },
    ShowLinks() {
      document.querySelector(".all_links").classList.toggle("hidden");
    },
=======
  mounted() {
    const list = document.querySelectorAll(".list");

    function activeLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }
    list.forEach((item) => item.addEventListener("click", activeLink));
>>>>>>> f5e3c3461ecd505a541f7bae8a902a7911069ffd
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
