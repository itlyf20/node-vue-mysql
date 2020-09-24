const express=require("express")
const router=express.Router();
const db=require("../db/db.js")

//查询所有
router.get("/selectall",(req,res)=>{
	let sql="select * from student"
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

//增加数据
router.post("/insertstu",(req,res)=>{
	let sql="insert into student(name,age,sex,address,tel,email) values(?,?,?,?,?,?)";
	let stu=[req.body.name,req.body.age,req.body.sex,req.body.address,req.body.tel,req.body.email]
	db.query(sql,stu,(err,data)=>{
		if(err){
			console.log(err.message)
			return;
		}else{
			res.send({
				code:200,
				msg:"insert success",
			})
		}
	})
})
//删除数据
router.post("/deletestu/:id",(req,res)=>{
	let sql="delete from student where id=?";
	let id=req.params.id
	db.query(sql,id,(err,data)=>{
		if(err){
			console.log(err.message)
			return;
		}else{
			res.send({
				code:200,
				msg:"delete success",
			})
		}
	})
})
//修改数据
router.post("/updatestu/:id",(req,res)=>{
	let sql="update student set name=?,age=?,sex=?,address=?,tel=?,email=? where id=?";
	let stu=[req.body.name,req.body.age,req.body.sex,req.body.address,req.body.tel,req.body.email,req.params.id]
	db.query(sql,stu,(err,data)=>{
		if(err){
			console.log(err.message)
			return;
		}else{
			res.send({
				code:200,
				msg:"update success",
			})
		}
	})
})

module.exports=router