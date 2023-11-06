<template>
  <div class="TheGallary">
    <div class="container">
      <div class="main_title">معرض الصور</div>
      <div class="box flex justify-between gap-2.5">
        <div
          class="feat text-center border p-2.5 w-1/4"
          v-for="img in imges"
          :key="img"
        >
          <img class="h-24 mx-auto" src="../assets/elemam_logo.png" alt="" />
          <div>title</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheGallary",
  data() {
    return {
      imges: 4,
    };
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 1200px) {
  .box {
    & > div {
      // width: 24%;
    }
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .box {
    & > div {
      width: 24%;
    }
  }
}

@media (max-width: 767px) {
  .box {
    flex-wrap: wrap;
    & > div {
      width: 48%;
    }
  }
}
</style>
