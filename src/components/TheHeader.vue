<template>
  <div
    class="Header border-b border-gray-300"
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 100;
    "
  >
    <div class="container flex justify-between items-center gap-2.5">
      <div class="logo">
        <router-link to="/" class="flex items-center gap-2.5">
          <img
            src="../assets/elemam_logo.png"
            alt="أكاديمية الإمام القانونية"
            class="h-24"
          />
          <span class="text-xl">أكاديمية الإمام القانونية</span>
        </router-link>
      </div>
      <div class="left flex items-center gap-2.5 flex-wrap">
        <div class="links relative hidden">
          <div class="all_links flex gap-2.5 rounded p-2.5">
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >أحدث الأخبار</span
            >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >الفرق الدراسية</span
            >
            <span class="cursor-pointer border-b border-gray-300 pb-2.5"
              >معرض الصور
            </span>
            <span class="cursor-pointer">تواصل معنا</span>
          </div>
        </div>

        <!-- <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> -->
        <div
          class="login flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
          v-if="!UserState"
          @click="close_1"
          style="border: 1px solid var(--main-color); color: var(--main-color)"
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
              <div class="add" v-if="UserAdmin === 'User'">
                <router-link to="/TheUser"> حسابي </router-link>
              </div>
              <div class="add" v-if="UserAdmin === 'Admin'">
                <router-link to="/AdminPage"> الإشراف </router-link>
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
          style="border: 1px solid var(--main-color); color: var(--main-color)"
          v-if="!UserState"
          @click="close_2"
        >
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          <span>حساب جديد</span>
        </div>
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <div v-bind="props">
              <font-awesome-icon :icon="['fas', 'bars']" class="text-2xl" />
            </div>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <a href="#"
                ><v-list-item-title>{{ item.title }}</v-list-item-title>
              </a>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
  <SignIn @close_1="close_1" v-if="close_1_State" />
  <TheRegister @close_2="close_2" v-if="close_2_State" />
</template>
<script>
import SignIn from "./SignIn.vue";
import TheRegister from "./TheRegister.vue";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBOlDn6NmPGHHfdY-gYHvnA6MoM-y0Xbmo",
  authDomain: "elemam-center-for-training.firebaseapp.com",
  projectId: "elemam-center-for-training",
  storageBucket: "elemam-center-for-training.appspot.com",
  messagingSenderId: "253703295162",
  appId: "1:253703295162:web:927a97dbbc2276f30d7283",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default {
  name: "TheHeader",
  emits: ["State"],
  mounted() {
    this.UserStateFunction();
  },
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
      visitorCount: null,
      items: [
        { title: "أحدث الأخبار" },
        { title: "الفرق الدراسية" },
        { title: "معرض الصور" },
        { title: "تواصل معنا" },
      ],
    };
  },
  components: {
    SignIn,
    TheRegister,
  },
  computed: {
    UserAdmin() {
      return this.$store.state.UserAdmin;
    },
  },
  methods: {
    async TheState() {
      try {
        const q_Admin = query(
          collection(db, "المشرفين"),
          where("Id", "==", localStorage.getItem("userid"))
        );
        const querySnapshot_Admin = await getDocs(q_Admin);
        if (!querySnapshot_Admin.empty) {
          this.$store.commit("setUserAdmin", "Admin");
          console.log("Admin =>", this.UserAdmin);
        } else {
          this.$store.commit("setUserAdmin", "");
        }
      } catch (error) {
        console.log(error);
      }
      try {
        const q_User = query(
          collection(db, "الطلاب"),
          where("userid", "==", localStorage.getItem("userid"))
        );
        const querySnapshot_User = await getDocs(q_User);
        if (!querySnapshot_User.empty) {
          this.$store.commit("setUserAdmin", "User");
          console.log("Admin =>", this.UserAdmin);
        } else {
          this.$store.commit("setUserAdmin", "");
        }
      } catch (error) {
        console.log(error);
      }
      console.log("State =>", this.UserAdmin);
    },
    ShowLinks() {
      document.querySelector(".all_links").classList.toggle("hidden");
    },
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
      localStorage.removeItem("userid");
      localStorage.removeItem("type");
      localStorage.removeItem("userphone");
      this.state = null;
      setTimeout(() => {
        this.UserStateFunction();
        this.TheState();
      }, 100);
    },
    UserStateFunction() {
      console.log("UserStateFunction");
      this.state = null;
      if (localStorage.getItem("college_place")) {
        const inputString = localStorage.getItem("college_place");
        const Words = inputString.split(" ");

        const lastWord = Words[Words.length - 1];
        console.log(lastWord);
      }
      if (localStorage.getItem("type")) {
        this.thetype = localStorage.getItem("type") !== "بنين" ? "بكي " : "بك ";
      } else {
        this.thetype = "";
      }
      console.log(localStorage.getItem("type"));
      this.UserName = `${localStorage.getItem("username_1")} 
        ${localStorage.getItem("username_2") || ""} 
        ${localStorage.getItem("username_3") || ""}`;
      console.log(this.UserName);
      this.UserState = localStorage.getItem("userid") ? true : false;
      if (this.UserState) {
        var words = this.UserName.split(" ");
        console.log(words.slice(0, -1));
        this.firstLetters = words
          .slice(0, -1)
          .map(function (word) {
            return word.charAt(0) || "";
          })
          .join(" ");
        console.log(this.firstLetters);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .container {
    flex-direction: column;
    .logo {
      width: 100%;
    }
    .left {
      width: 100%;
      justify-content: space-between;
      .links {
        width: 90%;
        .click {
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
