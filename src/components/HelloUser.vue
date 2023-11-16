<template>
  <div class="main_Overlay" @click="Close"></div>
  <div
    class="container bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex flex-col gap-2.5 items-center"
  >
    <font-awesome-icon :icon="['fas', 'user-check']" class="text-6xl m-auto" />
    <h3 class="my-2.5">تم انشاء حسابك و تسجيل الدخول بنجاح</h3>
    <div>اضغط حسنًا للإستمرار</div>
    <button class="ml-auto border p-2.5 px-5" @click="Close">حسناً</button>
  </div>
</template>
<script>
export default {
  name: "HelloUser",
  methods: {
    Close() {
      this.$emit("close");
      this.$emit("close_2");

      localStorage.setItem(
        "UserState",
        localStorage.getItem("username") ? true : false
      );
    },
  },
};
</script>
