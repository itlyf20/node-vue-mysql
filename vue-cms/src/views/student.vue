<template>
  <div class="student">
    <table>
      <tr>
        <td colspan="5">
          <el-button type="primary" @click="dialogAdd" style="position: fixed;right:120px;">添加</el-button>
        </td>
      </tr>
    </table>
    <el-main style="margin:20px auto;width:90%;align-items:center;">
      <el-table border :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :row-style="{height: '60px'}">
        <el-table-column prop="id" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="用户名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!-- scope可以获取下标和一整行数据 -->
            <el-button type="primary" @click="dialogEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="dialogDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pageSize" background layout="total, prev, pager, next" :total="total" style="text-align:right;margin-top:30px">
      </el-pagination>
    </el-main>

    <!-- 向子组件传值 -->
    <Dialog :dialog="dialog" :profileForm="profileForm" @update="getProfile"></Dialog>
  </div>
</template>

<script>
  import Dialog from "../components/Dialog.vue"
  export default {
    name: "student",
    components: {
      Dialog
    },
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        //子组件对应的值
        dialog: {
          show: false, //是否显示弹出框
          title: "", //弹出框的title
          option: 'edit' //默认为编辑操作
        },
        profileForm: {
          name: "",
          age: "",
          sex: "",
          address: "",
          tel: "",
          email: ""
        }
      }
    },
    mounted() {
      this.getProfile();
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val; //当前页
      },
      //添加
      dialogAdd() {
        this.dialog = {
          show: true,
          title: "添加学生信息",
          option: "add"
        };
        //清空文本输入框
        this.profileForm = {
          name: "",
          age: "",
          sex: "",
          address: "",
          tel: "",
          email: "",
          id: ""
        }
      },
      //编辑
      dialogEdit(index, row) {
        this.dialog = {
          show: true,
          title: "修改学生信息",
          option: "edit"
        };
        //填充文本框
        this.profileForm = {
          name: row.name,
          age: row.age,
          sex: row.sex,
          tel: row.tel,
          address: row.address,
          email: row.email,
          id: row.id
        }
      },
      //删除
      dialogDel(index, row) {
        this.$axios.post(`/stu/deletestu/${row.id}`).then(res => {
          console.log(res)
          this.$message({
            message: res.data.msg,
            type: "success"
          })
          this.getProfile();
        })
      },
      getProfile() {
        this.$axios.get("/stu/selectall").then(res => {
          this.tableData = res.data.result;
          this.total = res.data.result.length;
        })
      }
    }
  }
</script>

<style>
</style>
