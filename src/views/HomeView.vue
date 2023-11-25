<template>
  <div class="home">
    <TestPaying />
    <TheLanding />
    <AboutCollege />
    <TheNews />
    <TheClasses />
    <TheGallary />
  </div>
</template>

<script>
// @ is an alias to /src
import TheLanding from "@/components/TheLanding.vue";
import AboutCollege from "@/components/AboutCollege.vue";
import TheNews from "@/components/TheNews.vue";
import TheClasses from "@/components/TheClasses.vue";
import TheGallary from "@/components/TheGallary.vue";
import TestPaying from "@/components/TestPaying.vue";

export default {
  name: "HomeView",
  components: {
    TheLanding,
    AboutCollege,
    TheNews,
    TheClasses,
    TheGallary,
    TestPaying,
  },
};
</script>
