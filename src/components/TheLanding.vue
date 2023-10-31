<template>
  <div class="TheLanding">
    <div class="container flex justify-center items-center">
      <div class="right w-1/2">
        <img class="h-72" src="../assets/elemam_logo.png" alt="" />
      </div>
      <div class="left w-1/2">
        <div class="title">أكاديمية الإمام هي :</div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          ut consectetur tempore at quod enim? Dolor sint aliquam perferendis
          culpa id sunt beatae dignissimos expedita necessitatibus rem molestiae
          velit iure consequatur possimus et, exercitationem odio minus quas
          veritatis iste illum!
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheLanding",
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
