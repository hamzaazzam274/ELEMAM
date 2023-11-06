<template>
  <div class="TheNews">
    <div class="container">
      <div class="main_title">أحدث الأخبار</div>
      <div class="box flex gap-2.5">
        <div class="w-1/2 border-gray-300 border p-2.5 rounded">
          <h3 class="title text-3xl">main title</h3>
          <div class="news">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, et.
          </div>
          <div class="img">
            <img class="h-96 mx-auto" src="../assets/elemam_logo.png" alt="" />
          </div>
          <div class="time text-left pl-2.5 text-[#717171] bold">
            2023/10/30
          </div>
        </div>
        <div class="w-1/2 border-gray-300 border p-2.5 rounded">
          <h3 class="title text-3xl">main title</h3>
          <div class="news">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, et.
          </div>
          <div class="img">
            <img class="h-96 mx-auto" src="../assets/elemam_logo.png" alt="" />
          </div>
          <div class="time text-left pl-2.5 text-[#717171] bold">
            2023/10/30
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheNews",
};
</script>
<style lang="scss" scoped>
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .box {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
}
</style>
