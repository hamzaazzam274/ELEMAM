<template>
  <TheHeader />
  <router-view />
  <ContactUs />
</template>
<script>
import TheHeader from "@/components/TheHeader.vue";
import ContactUs from "@/components/ContactUs.vue";
export default {
  components: {
    TheHeader,
    ContactUs,
  },
};
</script>
<style lang="scss">
:root {
  --main-color: #075e55;
}
body {
  direction: rtl;
}
.container {
  width: 90% !important;
  margin: 20px auto;
}
svg {
  cursor: pointer;
}
.mcolor {
  color: var(--main-color);
}
.bcolor {
  background: var(--main-color);
}
.main_title {
  color: var(--main-color);
  text-align: center;
  margin: 100px auto 50px;
  font-size: 24px;
  font-weight: bold;
}
.hover_color:hover {
  background: var(--main-color);
  color: #fff;
  transition: 0.3s;
}
.hover_color_border:hover {
  border-color: var(--main-color);
  transition: 0.3s;
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
}
</style>
