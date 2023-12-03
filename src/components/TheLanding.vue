<template>
  <div class="TheLanding">
    <div class="container flex justify-center items-center">
      <div class="right w-1/2">
        <!-- <img class="h-72" src="../assets/elemam_logo.png" alt="" /> -->

        <div class="animated-border">
          <img src="../assets/elemam_logo.png" alt="صورة" :style="imageStyle" />
          <div class="border-overlay"></div>
        </div>
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
  data() {
    return {
      imageStyle: {
        borderRadius: "0",
        animation: "floatAnimation 5s infinite, glowAnimation 3s infinite",
      },
      imageSrc: "رابط-الصورة",
    };
  },
  methods: {
    animateBorder() {
      this.intervalId = setInterval(() => {
        this.borderStyle = {
          borderLeftColor: getRandomColor(),
          transition: "border-left-color 0.5s ease-in-out",
        };

        this.imageStyle = {
          borderRadius: getRandomBorderRadius(),
          transition: "border-radius 0.5s ease-in-out",
        };
      }, 3000); // تحديث كل 3 ثوانٍ
    },
    resetBorder() {
      clearInterval(this.intervalId);
      this.borderStyle = {
        borderLeftColor: "transparent",
        transition: "border-left-color 0.5s ease-in-out",
      };

      this.imageStyle = {
        borderRadius: "0",
        transition: "border-radius 0.5s ease-in-out",
      };
    },
  },
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomBorderRadius() {
  return Math.floor(Math.random() * 50) + "px";
}
</script>
<style lang="scss" scoped>
@keyframes floatAnimation {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glowAnimation {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
  }
}

.animated-border {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.animated-border img {
  width: 100%;
  height: auto;
  display: block;
}

.border-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 4px solid transparent;
}
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
