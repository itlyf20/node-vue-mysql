<template>
  <div class="usermsg">
    <el-main style="margin:20px auto;width:90%;align-items:center;">
      <el-table border :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :row-style="{height: '60px'}">
        <el-table-column prop="id" label="序号" width="300"></el-table-column>
        <el-table-column prop="username" label="用户名" width="500"></el-table-column>
        <el-table-column prop="password" label="密码" width="665"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pageSize" background layout="total, prev, pager, next" :total="total" style="text-align:right;margin-top:30px">
      </el-pagination>
    </el-main>

  </div>
</template>

<script>
  export default {
    name: "usermsg",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val; //当前页
      },
    },
    mounted() {
      this.$axios.get("/user/selectall").then(res => {
        this.tableData = res.data.result;
        this.total = res.data.result.length;
      })
    }
  }
</script>

<style>
</style>
