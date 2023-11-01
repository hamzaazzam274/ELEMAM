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
        >
          <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" />
          <span>تسجيل دخول</span>
        </div>
        <div
          class="registr flex gap-2.5 items-center cursor-pointer bg-[#eee] p-2.5 rounded-md"
        >
          <font-awesome-icon :icon="['fas', 'user-plus']" />
          <span>حساب جديد</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
  methods: {
    ShowLinks() {
      document.querySelector(".all_links").classList.toggle("hidden");
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
