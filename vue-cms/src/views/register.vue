<template>
  <div class="register">
    <div class="registerform">
    			<h1>后台管理系统</h1>
    			<el-form :model="ruleForm" :rules="rules" label-width="100" ref="ruleForm">
    			  <el-form-item label="用户名" prop="username">
    			    <el-input v-model="ruleForm.username"></el-input>
    			  </el-form-item>
    			  <el-form-item  label="密码" prop="password">
    			    <el-input type="password" v-model="ruleForm.password" ></el-input>
    			  </el-form-item>
    			  <el-form-item>
    			    <el-button type="primary" @click="submitForm" class="btn1">注册</el-button>
    			  </el-form-item>
    			</el-form>
    		</div>
  </div>
</template>

<script>
  export default{
    name:"register",
    data(){
      return{
        ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
             {required:true,message:"用户名不能为空", trigger: 'blur' },
             {min:4,max:12,message:"长度必须是4-12位"}
          ],
          password: [
            { required:true,message:"密码不能为空", trigger: 'blur' },
            {min:6,max:12,message:"长度必须是6-12位"}
          ]
        }
      }
    },
     methods: {
      submitForm() {
         this.$axios.post('/user/register',this.ruleForm).then(res=>{
        //注册成功
        this.$message({
          message:"账号注册成功",
          type:"success"
        })
        this.$router.push("/login")
      })
      }
    }
  }
</script>

<style scoped="scoped">
  .register{
  		width: 100%;
  		height: 100vh;
  		background-color: #0000FF;
      background-position: center center;
  		position: relative;
  	}
  	.registerform{
  		width: 400px;
  		height: 400px;
  		background-color: #ffffff;
  		position: absolute;
  		left: 40%;
  		top: 30%;
  		text-align: center;
  	}
  	.registerform h1{
  		font-size: 19px;
  		margin: 10px auto;
  	}
  	.el-form-item{
  		margin-left: 5%;
      margin-top: 20px;
      margin-right: 5%;
  	}
  	.btn1{
      margin-top:30px;
  		width: 90%;
  	}
</style>
