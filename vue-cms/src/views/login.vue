<template>
  <div class="login">
    <div class="loginform">
    			<h1>后台管理系统</h1>
    			<el-form :model="ruleForm" :rules="rules" label-width="100" ref="ruleForm">
    			  <el-form-item label="用户名" prop="username">
    			    <el-input v-model="ruleForm.username"></el-input>
    			  </el-form-item>
    			  <el-form-item  label="密码" prop="password">
    			    <el-input type="password" v-model="ruleForm.password" ></el-input>
    			  </el-form-item>
    			  <el-form-item>
    			    <el-button type="primary" @click="submitForm" class="btn1">登录</el-button>
              <el-button type="text" @click="registerForm" class="btn1">没有账号？去注册</el-button>
    			  </el-form-item>
    			</el-form>
    		</div>
  </div>
</template>

<script>
  export default{
    name:"login",
    data(){
      return{
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required:true,message:"用户名不能为空", trigger: 'blur' }
          ],
          password: [
            { required:true,message:"密码不能为空", trigger: 'blur' }
          ]
        }
      }
    },
     methods: {
      submitForm() {
         this.$axios.post('/user/login',this.ruleForm).then(res=>{
              if(res.data.code==200){
                const token=res.data.token
                const username=res.data.username
                 localStorage.setItem("eleToken",token);
                 localStorage.setItem("user",username);
                 this.$message({
                  message:res.data.msg,
                  type:"success"
                })
                this.$router.push("/index")
              }else{
                this.$message({
                  message:res.data.msg,
                  type:"error"
                })
                return;
              }
         })
      },
      registerForm(){
        this.$router.push("/register")
      }
    }
  }
</script>

<style scoped="scoped">
  .login{
  		width: 100%;
  		height: 100vh;
  		background-color: #0000FF;
      background-position: center center;
  		position: relative;
  	}
  	.loginform{
  		width: 400px;
  		height: 400px;
  		background-color: #ffffff;
  		position: absolute;
  		left: 40%;
  		top: 30%;
  		text-align: center;
  	}
  	.loginform h1{
  		font-size: 19px;
  		margin: 10px auto;
  	}
  	.el-form-item{
  		margin-left: 5%;
      margin-top: 20px;
      margin-right: 5%;
  	}
  	.btn1{
      margin-top:20px;
  		width: 90%;
  	}
</style>
