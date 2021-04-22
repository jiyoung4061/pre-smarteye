<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');

body {
  font-family: "Noto Sans KR", sans-serif;
  margin:0px;
}

body #content {
  /* background-color: #f8f8f8; */
    margin-left: 260px;
    overflow: hidden;
  }
body .title {
  font-size: 26px;
  letter-spacing: -1px;
  line-height: 40px;
  color: #0b6ad5;
  font-weight: bold;
  margin-right: 50px;
}
body .title-wrapper {
    padding: 41px;
}
body .addContainer {
  border: 1px solid #0b6ad5;
  background-color: #d6e9ff;
  width: 25px;
  height: 25px;
  display: inline-block;
  text-align: center;
}
body table {
      border-collapse: collapse;
  }
body .table1-head-title {
    text-align:center;
    vertical-align: middle;
    height: 40px;
    background-color: #f6f7fb;
  }
body .table1-head-title th {
    font-size : 13px;
    letter-spacing: -1px;
    color: #5e6872;
  }
body .table1-body{
      overflow:scroll;
      text-align: center;
      background-color: #eff4f8;
      height: 50px;
      vertical-align: middle;
  }
body .table1-body td {
    font-size: 14px;
    letter-spacing: 0px;
    color: #999999;
  }

.button-add {
  background-color: #0b6ad5;
  color: #ffffff;
}
.button-cancle {
  background-color: #ffffff;
  color: #0b6ad5;
}
.button-add,
.button-cancle {
  width: 91px;
  height: 34px;
  border-radius: 1px;
  border: 1px solid #0b6ad5;
  float: right;
  font-size: 15px;
  letter-spacing: 0px;
  margin : 10px;
}
.groupbutton {
  display: inline-block;
  width: 100px;
  border: 1px solid #0b6ad5;
  line-height: 35px;
  border-radius: 1px;
  padding: 0px 10px;
  margin-right: 15px;
  font-size: 15px;
  letter-spacing: 0px;
  color: #0b6ad5;
}
.groupremove {
  color: #0b6ad5;
  float: right;
}
.content-result {
  margin-left: 41px;
  margin-top: 50px;
}
.select-condition {
  font-size: 15px;
  letter-spacing: 0px;
  color: #424246;
  margin-left: 41px;
}
.condition-table-body {
  height: 60px;
}
.condition-table-body input,
.condition-table-body select {
  height: 36px;
  border-radius: 4px;
  border: 1px solid rgba(110, 110, 110, 0.4);
}
.condition-table-body input {
  width: 110px;
}
.condition-table-body select {
  margin-top: 10px;
  width: 220px;
}
.condition-table {
  vertical-align: middle;
}
</style>
