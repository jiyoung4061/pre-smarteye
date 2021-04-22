<template>
<div class="container">
    <div class="top"></div>

    <div class="wrapper">
        <router-link to="/main">
        <div class="logo-wrapper">
          <img src="src/assets/캡처.png" class="logo">
        </div>

        <div class="input-wrapper">
          <input class="id-input" placeholder="ID"/>
          <input class="pw-input" placeholder="PASSWORD"/>
        </div>

        <div class="button-wrapper">
          <button class="loginbutton">
            <span class="login-text">LOGIN</span>
          </button>
        </div>
        </router-link>
    </div>
    <div class="bottom"></div>

</div>
</template>
<script>
export default {

}
</script>
<style lang="css" scoped>
body {
  margin-left: 0px;
}
.top {
  width: 100%;
  height: 41px;
  background-color: #0b6ad5;
}
.bottom {
  width: 100%;
  height: 41px;
  background-color: #5a595e;
}
.wrapper {
  width: 447px;
  height: 371px;
  background-color: #f8f8f8;
  border: 1px solid #e3e3e3;
  margin: 0 auto;
  margin-top : 150px;
  margin-bottom : 150px;
  display: block;
  text-align: center;
}

.logo-wrapper {
  margin-top: 40px;
}
.button-wrapper {
  margin: 30px;

}
.loginbutton {
  width: 336px;
  height: 55px;
  border-radius: 5px;
  background-color: #0b6ad5;
  border: 1px solid #2f906e;
}
.login-text {
  font-size: 20px;
  letter-spacing: -1px;
  color: #ffffff;
  font-family: "Noto Sans CJ Kkr";
  text-align: center;
}

input {
  width: 336px;
  height: 50px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  margin: 10px 0 10px 0;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 30px;
  text-indent: 50px;
}
.pw-input {
  background-image: url("../../assets/lock.png");
}
.id-input {
  background-image: url("../../assets/usericon.png");
}

</style>
