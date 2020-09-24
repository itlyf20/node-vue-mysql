const express=require("express")
const router=express.Router();
const md5=require("blueimp-md5")
var jwt = require("jsonwebtoken");
var key = "sdfafjkjsdjflkdskjfk";
const db=require("../db/db.js")

//登录
router.post("/login",(req,res)=>{
	let username=req.body.username;
	let password=req.body.password
	let sql="select * from user where username = '"+username+"' and password = '"+md5(password)+"'"
	db.query(sql,(err,data)=>{
		if(err){
			console.log(err.message)
			return;
		}else{
			const token=jwt.sign({username: username}, key);
			if(data.length==0){
				res.send({msg:"用户名和密码错误！"})
				return;
			}else{
				res.send({
					msg:"登录成功！",
					token:token,
					code:200,
					username:username
				})
			}
			
		}
	})
})
//注册
router.post("/register",(req,res)=>{
	let sql="insert into user(username,password) values(?,?)";
	let username=req.body.username;
	let password=req.body.password
	db.query(sql,[username,md5(password)],(err,data)=>{
		if(err){
			console.log(err.message)
			return;
		}else{
			res.send({
				code:200,
				msg:"register success",
			})
		}
	})
})
//查询所有注册用户的信息
router.get("/selectall",(req,res)=>{
	let sql="select * from user"
	db.query(sql,(err,data)=>{
		if(err){
			console.log(err.message);
			return;
		}else{
			res.send({
				code:200,
				msg:"success",
				result:data
			})
		}
	})
})


module.exports=router