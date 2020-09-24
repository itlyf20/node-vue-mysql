<template>
  <div class="index">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-header>
        <div class="header">
          <el-row>
            <el-col :span="6" class="logo-container">
              <span class="title">用户学生后台管理系统</span>
            </el-col>
            <el-col :span="5" class="userinfo">
              <span class="title2">欢迎你！&nbsp;{{user}}</span>
              <el-dropdown @command="setDialogInfo">
                <span class="el-dropdown-link">
                  <span class="title">用户设置</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 250)">
          <el-menu>
            <router-link to="/student" tag="el-menu-item" class="link">学生信息</router-link>
            <router-link to="/usermsg" tag="el-menu-item" class="link">用户信息</router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        user: ""
      }
    },
    created() {
      var user = localStorage.getItem("user")
      this.user = user
    },
    methods: {
      // 下拉框选择，点击个人信息后调整到对应的函数执行
      setDialogInfo(comItem) {
        switch (comItem) {
          case "info":
            this.showInfoList();
            break;
          case "logout":
            this.logout();
            break;
        }
      },
      //展示个人信息
      showInfoList() {
        this.$alert(
          `<div>名称：${this.user}</div>`,
          '个人信息', {
            dangerouslyUseHTMLString: true
          });
      },
      //退出登录
      logout() {
        this.$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //清除token
          localStorage.removeItem("eleToken");
          //跳转
          this.$router.push("/login")
        }).catch(() => {
          return;
        });
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: lightgray;
    color: #000000;
    line-height: 60px;
  }

  .el-aside {
    color: #000000;
  }

  .logo-container {
    display: flex;
  }

  .header {
    position: relative;
  }

  .userinfo {
    display: flex;
    text-align: right;
    position: absolute;
    right: 0;
  }

  .title {
    padding: 0 10px;
    font-size: 18px;
    color: #000000;
  }
  .title2 {
    padding: 0 10px;
    font-size: 18px;
    color: red;
  }
</style>
