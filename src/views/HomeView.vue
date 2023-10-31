<template>
  <div class="home">
    <TheHeader />
    <TheLanding />
    <AboutCollege />
    <TheNews />
    <TheClasses />
    <TheGallary />
    <ContactUs />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "@/components/TheHeader.vue";
import TheLanding from "@/components/TheLanding.vue";
import AboutCollege from "@/components/AboutCollege.vue";
import TheNews from "@/components/TheNews.vue";
import TheClasses from "@/components/TheClasses.vue";
import TheGallary from "@/components/TheGallary.vue";
import ContactUs from "@/components/ContactUs.vue";

export default {
  name: "HomeView",
  components: {
    TheHeader,
    TheLanding,
    AboutCollege,
    TheNews,
    TheClasses,
    TheGallary,
    ContactUs,
  },
};
</script>
