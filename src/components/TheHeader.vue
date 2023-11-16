<template>
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
</template>
<script>
import SignIn from "./SignIn.vue";
import TheRegister from "./TheRegister.vue";
export default {
  name: "TheHeader",
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
    mounted() {
      const list = document.querySelectorAll(".list");

      function activeLink() {
        list.forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
      }
      list.forEach((item) => item.addEventListener("click", activeLink));
    },
  },
};
</script>
