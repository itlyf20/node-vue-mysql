<template>
	<div class="dialog">
		<!-- 添加资金数据弹框 -->
		<el-dialog :title="dialog.title"
		  :close-on-click-modal="false"
		  :close-on-press-escape="false"
		  :modal-append-to-body="false"
		  :visible.sync="dialog.show">
		  <el-form :model="profileForm" :rules="rules" ref="profileForm" label-width="60">
			  <el-form-item label="姓名" prop="name">
			    <el-input v-model="profileForm.name" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="年龄" prop="age">
			    <el-input v-model="profileForm.age" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="性别" prop="sex">
			    <el-input v-model="profileForm.sex" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="地址" prop="address">
			    <el-input v-model="profileForm.address" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="电话" prop="tel">
			    <el-input v-model="profileForm.tel" autocomplete="off"></el-input>
			  </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="profileForm.email" autocomplete="off"></el-input>
        </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="handleclose">取 消</el-button>
		    <el-button type="primary" @click="handleAddAndEdit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:"Dialog",
		// 获取父亲传过来的值
		props:{
			dialog:Object,
			profileForm:Object
		},
		data(){
			return{
				rules: {
				 name: [
					  { required:true,message:"姓名不能为空", trigger: 'blur' }
				  ],
				  age: [
				    { required:true,message:"年龄不能为空", trigger: 'blur' }
				  ],
				  sex: [
				    {required:true,message:"性别不能为空", trigger: 'blur' }
				  ],
				  address: [
				    {required:true,message:"地址不能为空", trigger: 'blur' }
				  ],
				  tel: [
				    {required:true,message:"电话不能为空", trigger: 'blur' }
				  ],
				  email: [
				    {type:"email",required:true,message:"邮箱不能为空", trigger: 'blur' }
				  ],
				}
			}
		},
		methods:{
			handleAddAndEdit(){
				//判断用户选择的是添加还是编辑按钮
				const url=this.dialog.option=="add" ? "insertstu" :`updatestu/${this.profileForm.id}`
				this.$axios.post(`/stu/${url}`,this.profileForm).then(res=>{
					this.$message({ 
					  message:res.data.msg,
					  type:"success"
					})
				})
				this.dialog.show=false;
				this.$emit("update")
			},
			handleclose(){
				this.dialog.show=false
			}
		}
	}
</script>

<style>
</style>
