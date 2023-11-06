<template>
  <div class="ContactUs">
    <div class="container flex justify-center items-center">
      <div class="feat">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </div>
      <div class="feat">
        <font-awesome-icon :icon="['fas', 'envelope']" />
      </div>
      <div class="feat">
        <font-awesome-icon :icon="['fas', 'phone']" />
      </div>
      <div class="feat">
        <font-awesome-icon :icon="['fab', 'facebook']" />
      </div>
    </div>
    <div class="copyright text-center bg-[--main-color] p-2.5 text-white">
      جميع الحقوق محفوظة Salem team
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactUs",
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
    & > div {
      width: 100%;
    }
  }
}
</style>
