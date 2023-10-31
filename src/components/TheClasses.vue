<template>
  <div class="TheClasses">
    <div class="container">
      <div class="main_title">الفرق الدراسية</div>
      <div class="box shadow p-2.5 rounded">
        <div class="number flex justify-center gap-10 mb-5">
          <div class="feat relative">
            <span
              class="absolute h-1 w-10 -right-full top-1/2 bg-[--main-color]"
            ></span>
            <div
              class="bg-[--main-color] w-10 h-10 rounded-full p-2.5 flex justify-center items-center text-white text-xl"
            >
              1
            </div>
          </div>
          <div class="feat relative">
            <span
              class="absolute h-1 w-10 -right-full top-1/2 bg-[--main-color] opacity-50"
            ></span>
            <div
              class="bg-[--main-color] w-10 h-10 rounded-full p-2.5 flex justify-center items-center text-white text-xl opacity-50"
            >
              2
            </div>
          </div>
          <div class="feat relative">
            <span
              class="absolute h-1 w-10 -right-full top-1/2 bg-[--main-color] opacity-50"
            ></span>
            <span
              class="absolute h-1 w-10 -left-full top-1/2 bg-[--main-color] opacity-50"
            ></span>
            <div
              class="bg-[--main-color] w-10 h-10 rounded-full p-2.5 flex justify-center items-center text-white text-xl opacity-50"
            >
              3
            </div>
          </div>
        </div>
        <div class="content">
          <div class="selecte_1 flex justify-center gap-2.5">
            <span
              class="border-gray-300 border rounded flex justify-center items-center w-1/2 p-10 cursor-pointer hover_color_border"
              >انا طالب في كلية الشريعة و القانون</span
            >
            <span
              class="border-gray-300 border rounded flex justify-center items-center w-1/2 p-10 cursor-pointer hover_color_border"
              >انا طالب في معهد معاوني القضاء</span
            >
          </div>
          <div class="selecte_2 hidden flex justify-center gap-2.5">
            <span
              class="border-gray-300 border rounded flex justify-center items-center w-1/2 p-10 cursor-pointer hover_color_border"
              >عربي</span
            >
            <span
              class="border-gray-300 border rounded flex justify-center items-center w-1/2 p-10 cursor-pointer hover_color_border"
              >English</span
            >
          </div>
          <div class="selecte_3 hidden flex justify-center gap-2.5">
            <span
              v-for="Class in classes"
              :key="Class"
              class="border-gray-300 border rounded flex justify-center items-center w-1/4 p-10 cursor-pointer hover_color_border"
              >{{ Class }}</span
            >
          </div>
        </div>
        <div class="btn">
          <div
            class="border border-[--main-color] p-2.5 rounded cursor-pointer w-min text-[--main-color] mt-2.5 hover_color"
          >
            السابق
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheClasses",
  mounted() {
    this.select();
  },
  data() {
    return {
      classes: [
        "الفرقة الأولي",
        "الفرقة الثانية",
        "الفرقة الثالثة",
        "الفرقة الرابعة",
      ],
    };
  },
  methods: {
    select() {
      let btn = document.querySelectorAll(".number .feat > div");
      let span = document.querySelectorAll(".number .feat > div");
      let content = document.querySelectorAll(".content > div");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = function () {
          content.forEach((e) => e.classList.add("hidden"));
          btn.forEach((e) => e.classList.add("opacity-50"));
          span.forEach((e) => e.classList.add("opacity-50"));
          content[i].classList.remove("hidden");
          btn[i].classList.remove("opacity-50");
          span[i].classList.remove("opacity-50");
        };
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
  .content > div {
    flex-direction: column;
    & > span {
      width: 100%;
    }
  }
}
</style>
