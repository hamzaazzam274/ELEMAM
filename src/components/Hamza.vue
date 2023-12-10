<template>
  <div class="section">
    <div class="images" data-aos="fade-left">
      <img src="../assets/online-lesson.png" alt="hamza" />
      <img src="../assets/exam.png" alt="hamza" />
      <img id="law-book" src="../assets/law-book.png" alt="hamza" />
      <img src="../assets/test.png" alt="hamza" />
      <img src="../assets/clock.png" alt="hamza" />
    </div>
    <div
      id="text"
      class="moving-element"
      :class="{ 'move-up': isScrollingUp, 'move-down': isScrollingDown }"
      v-observe-visibility="handleVisibilityChange"
      ref="movingElement"
    >
      <h1 class="pe-30">كورسات في كل المواد</h1>
      <h1>امتحانات رقمية بنظام MCQ</h1>
      <h1>اكثر من الف سؤال لكل ماده</h1>
      <h1>امتحانات دورية ومستمره</h1>
      <h1>امتحانات بمؤقت ونتائج فوريه</h1>
    </div>
  </div>
</template>

<script>
import { Scrollama, Step } from "vue-scrollama";
import AOS from "aos";
import "aos/dist/aos.css";
import VueObserveVisibility from "vue-observe-visibility";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Hamza",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Scrollama,
    // eslint-disable-next-line vue/no-unused-components
    Step,
  },
  data() {
    return {
      isScrollingUp: false,
      isScrollingDown: false,
      scrollPosition: 0,
      elementColor: "#3498db",
    };
  },
  mounted() {
    AOS.init();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  directives: {
    "observe-visibility": VueObserveVisibility,
  },
  methods: {
    handleStepEnter(response) {
      if (response.direction === "down") {
        this.isScrollingUp = false;
        this.isScrollingDown = true;
      } else {
        this.isScrollingUp = true;
        this.isScrollingDown = false;
      }
    },
    handleVisibilityChange(isVisible) {
      if (isVisible) {
        // قم بتنفيذ الحركة هنا عند ظهور العنصر في الصفحة
        console.log("Element is visible");
      } else {
        // يمكنك تنفيذ أي شيء آخر هنا عند اختفاء العنصر
        console.log("Element is not visible");
      }
    },
    handleScroll() {
      this.scrollPosition = window.scrollY;
      if (this.scrollPosition > 0) {
        this.elementColor = "red"; // اختر اللون الذي تريده
      } else {
        this.elementColor = "#3498db"; // لون العنصر الافتراضي عندما يكون في الأعلى
      }
      const scrollY = window.scrollY;

      if (scrollY > this.lastScrollY) {
        this.isScrollingDown = true;
        this.isScrollingUp = false;
      } else if (scrollY < this.lastScrollY) {
        this.isScrollingDown = false;
        this.isScrollingUp = true;
      }

      this.lastScrollY = scrollY;
    },
  },
};
</script>

<style>
.moving-element {
  transition: transform 4s ease;
}

.move-up {
  transform: translateY(-380px);
}

.move-down {
  transform: translateY(100px);
}
.section {
  background-color: mediumseagreen;
  height: 600px;
}
#text {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#text h1 {
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: beige;
  color: var(--maincolor);
  border-radius: 30px;
  margin-right: 20px;
  padding: 10px;
  font-family: "Noto Kufi Arabic", sans-serif;
  font-size: 30px;
  color: var(--main-color);
  transition: 0.5s ease;
  &:hover {
    transform: scale(1.5);
  }
}
.images {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 70px;
}
.images img {
  width: 200px;
  height: 200px;
  transition: 0.5s ease;
  &:hover {
    transform: scale(1.5);
  }
}
.law-book {
  color: rgb(0, 132, 255);
}
</style>
