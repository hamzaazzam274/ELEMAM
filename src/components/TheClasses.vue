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
              class="bg-[--main-color] w-10 h-10 rounded-full p-2.5 flex justify-center items-center text-white text-xl cursor-pointer"
            >
              1
            </div>
          </div>
          <div class="feat relative">
            <span
              class="absolute h-1 w-10 -right-full top-1/2 bg-[--main-color]"
            ></span>
            <div
              class="bg-[--main-color] w-10 h-10 rounded-full p-2.5 flex justify-center items-center text-white text-xl opacity-50 cursor-pointer"
            >
              2
            </div>
          </div>
          <div class="feat relative">
            <span
              class="absolute h-1 w-10 -right-full top-1/2 bg-[--main-color]"
            ></span>
            <span
              class="absolute h-1 w-10 -left-full top-1/2 bg-[--main-color]"
            ></span>
            <div
              class="bg-[--main-color] w-10 h-10 rounded-full p-2.5 flex justify-center items-center text-white text-xl opacity-50 cursor-pointer"
            >
              3
            </div>
          </div>
        </div>
        <div class="content">
          <div class="selecte_1 flex justify-center gap-2.5 flex-wrap">
            <span
              class="border-gray-300 border rounded flex justify-center items-center p-10 cursor-pointer hover_color_border w-5/12"
              >كلية الشريعة و القانون</span
            >
            <span
              class="border-gray-300 border rounded flex justify-center items-center p-10 cursor-pointer hover_color_border w-5/12"
              >معهد أعوان القضاء</span
            >
          </div>
          <div class="selecte_2 hidden flex justify-center gap-2.5 flex-wrap">
            <span
              class="border-gray-300 border rounded flex justify-center items-center p-10 cursor-pointer hover_color_border w-5/12"
              >عربي</span
            >
            <span
              class="border-gray-300 border rounded flex justify-center items-center p-10 cursor-pointer hover_color_border w-5/12"
              >English</span
            >
            <div class="btn w-85">
              <div
                class="border border-[--main-color] p-2.5 rounded cursor-pointer w-min text-[--main-color] mt-2.5 hover_color"
              >
                السابق
              </div>
            </div>
          </div>
          <div class="selecte_3 hidden">
            <router-link
              to="/Main_Class"
              class="flex justify-center gap-2.5 flex-wrap"
            >
              <span
                v-for="Class in classes"
                :key="Class"
                class="border-gray-300 border rounded flex justify-center items-center w-23 p-10 cursor-pointer hover_color_border"
              >
                {{ Class }}
              </span>
            </router-link>
            <div class="btn w-95 flex justify-between m-auto">
              <div
                class="border border-[--main-color] p-2.5 rounded cursor-pointer w-min text-[--main-color] mt-2.5 hover_color"
              >
                السابق
              </div>
              <div
                class="border border-[--main-color] p-2.5 rounded cursor-pointer w-min text-[--main-color] mt-2.5 hover_color next"
              >
                التالي
              </div>
            </div>
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
      type: "",
      lang: "",
      class: "",
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
      let numbers = document.querySelectorAll(".number .feat > div");
      let content = document.querySelectorAll(".content > div");
      document.querySelectorAll(".selecte_1 span").forEach((e) => {
        e.onclick = () => {
          this.type = e.innerHTML;
          numbers.forEach((e) => e.classList.add("opacity-50"));
          numbers[1].classList.remove("opacity-50");
          content.forEach((e) => e.classList.add("hidden"));
          content[1].classList.remove("hidden");
        };
      });
      document.querySelectorAll(".selecte_2 span").forEach((e) => {
        e.onclick = () => {
          this.lang = e.innerHTML;
          numbers.forEach((e) => e.classList.add("opacity-50"));
          numbers[2].classList.remove("opacity-50");
          content.forEach((e) => e.classList.add("hidden"));
          content[2].classList.remove("hidden");
        };
        document.querySelector(".selecte_2 .btn > div").onclick = () => {
          numbers.forEach((e) => e.classList.add("opacity-50"));
          numbers[0].classList.remove("opacity-50");
          content.forEach((e) => e.classList.add("hidden"));
          content[0].classList.remove("hidden");
        };
      });
      document.querySelectorAll(".selecte_3 span").forEach((e) => {
        e.onclick = () => {
          this.class = e.innerHTML;
          console.log(e.innerHTML);
          console.log(this.class);
          this.$store.commit("updateType", this.type);
          this.$store.commit("updateLang", this.lang);
          this.$store.commit("updateClass", this.class);
          numbers.forEach((e) => e.classList.add("opacity-50"));
          numbers[0].classList.remove("opacity-50");
          content.forEach((e) => e.classList.add("hidden"));
          content[0].classList.remove("hidden");
        };
        document.querySelector(".selecte_3 .btn > div").onclick = () => {
          numbers.forEach((e) => e.classList.add("opacity-50"));
          numbers[1].classList.remove("opacity-50");
          content.forEach((e) => e.classList.add("hidden"));
          content[1].classList.remove("hidden");
        };
        document.querySelector(".selecte_3 .btn > .next").onclick = () => {
          console.log(this.type);
          console.log(this.lang);
          console.log(this.class);
        };
      });
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
  .selecte_3 > a > span {
    width: 100%;
    & > span {
      flex-direction: column;
    }
  }
}
</style>
