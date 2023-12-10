<template>
  <div class="home">
    <TheLanding />
    <Hamza />
    <!-- <TheNews /> -->
    <TheClasses />
    <TheGallary />
  </div>
</template>

<script>
// @ is an alias to /src
import TheLanding from "@/components/TheLanding.vue";
import Hamza from "@/components/Hamza.vue";
// import TheNews from "@/components/TheNews.vue";
import TheClasses from "@/components/TheClasses.vue";
import TheGallary from "@/components/TheGallary.vue";

export default {
  name: "HomeView",
  components: {
    TheLanding,
    // Hamza,
    Hamza,
    // TheNews,
    TheClasses,
    TheGallary,
  },
};
</script>
