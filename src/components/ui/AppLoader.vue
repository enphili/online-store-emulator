<template>
  <div class="loader active_loader">
    <div class="loadingio-spinner-spinner-bevc3mgqsin">
      <div class="ldio-zz7qfnulb5n">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.loader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 0%;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
  z-index: 1000;
}

.loader.active_loader {
  visibility: visible;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes ldio-zz7qfnulb5n {
  0% {
    opacity: 1
  }

  100% {
    opacity: 0
  }
}

.loadingio-spinner-spinner-bevc3mgqsin {
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
}

.ldio-zz7qfnulb5n {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.ldio-zz7qfnulb5n div {
  box-sizing: content-box;
  transform-origin: -75% 75%;
  position: absolute;
  top: 15%;
  left: 50%;
  animation: ldio-zz7qfnulb5n linear 0.6s infinite;
  background: #4284f0;
  width: 3%;
  height: 45%;
  border-radius: 40% / 40%;
}

.ldio-zz7qfnulb5n div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.5s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(2) {
  transform: rotate(25.7deg);
  animation-delay: -0.47s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(3) {
  transform: rotate(51.4deg);
  animation-delay: -0.43s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(4) {
  transform: rotate(77.1deg);
  animation-delay: -0.39s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(5) {
  transform: rotate(102.8deg);
  animation-delay: -0.35s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(6) {
  transform: rotate(128.6deg);
  animation-delay: -0.31s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(7) {
  transform: rotate(154.3deg);
  animation-delay: -0.27s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(8) {
  transform: rotate(180deg);
  animation-delay: -0.23s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(9) {
  transform: rotate(205.7deg);
  animation-delay: -0.19s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(10) {
  transform: rotate(231.4deg);
  animation-delay: -0.16s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(11) {
  transform: rotate(257.1deg);
  animation-delay: -0.12s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(12) {
  transform: rotate(282.8deg);
  animation-delay: -0.08s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(13) {
  transform: rotate(308.6deg);
  animation-delay: -0.04s;
  background: #4284f0;
}
.ldio-zz7qfnulb5n div:nth-child(14) {
  transform: rotate(334.3deg);
  animation-delay: 0s;
  background: #4284f0;
}

</style>