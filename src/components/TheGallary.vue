<template>
  <div class="TheGallary animate__backInDown" id="TheGallary">
    <div class="container">
      <div class="main_title">معرض الصور</div>
      <div class="buttons">
        <div class="active">الكل</div>
        <div>تكريم</div>
        <div>في الأكاديمية</div>
      </div>
      <div class="box flex justify-between gap-2.5 flex-wrap">
        <div class="img1">
          <img
            class="image1"
            src="../assets/370163562_754495903355628_2280858242050324458_n.jpg"
            alt=""
          />
        </div>
        <img
          class="img2"
          src="../assets/370163562_754495903355628_2280858242050324458_n.jpg"
          alt=""
        />
        <img
          class="img3"
          src="../assets/370163562_754495903355628_2280858242050324458_n.jpg"
          alt=""
        />
        <img
          class="img4"
          src="../assets/370163562_754495903355628_2280858242050324458_n.jpg"
          alt=""
        />
        <img
          class="img5"
          src="../assets/370163562_754495903355628_2280858242050324458_n.jpg"
          alt=""
        />
        <img
          class="img6"
          src="../assets/370163562_754495903355628_2280858242050324458_n.jpg"
          alt=""
        />
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
.buttons {
  display: flex;
  gap: 10px;
  text-align: center;
  justify-content: center;
  margin: -40px auto 40px;
  div {
    border: 1px solid var(--main-color);
    cursor: pointer;
    color: var(--main-color);
    width: 90px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    &.active {
      background: var(--main-color);
      color: #fff;
    }
  }
}
@media (min-width: 1200px) {
  .box {
    & > div {
      // width: 24%;
    }
  }
}
img {
  width: 30%;
  border-radius: 6px;
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
.img1 {
  display: grid;
  place-items: center;
  transition: 0.7s ease;
  border-radius: px;
  --border-size: 5px;
  --border-angle: 0turn;
  width: 30%;
  background-image: conic-gradient(
      from var(--border-angle),
      #213,
      #112 50%,
      #213
    ),
    conic-gradient(from var(--border-angle), transparent 20%, #08f, #f03);
  background-size: calc(100% - (var(--border-size) * 2))
      calc(100% - (var(--border-size) * 2)),
    cover;
  background-position: center center;
  background-repeat: no-repeat;

  animation: bg-spin 3s linear infinite;
  @keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }

  &:hover {
    transform: scale(1.1);
  }
}

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}
.image1 {
  width: 98%;
  height: 98%;
  border-radius: 0px;
  //padding: 1px 0 0 1px;
}
</style>
