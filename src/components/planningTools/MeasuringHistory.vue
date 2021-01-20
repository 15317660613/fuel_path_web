<template>
  <div class="measuringHistory">
    <el-table
      :data="tableDate"
      style="width: 100%"
      :header-cell-style="{background:'#679BD0',color:'#fff'}"
      height="100%"
      v-loading="tableLoading"
      border
      align="center"
    >
      <el-table-column align="center" show-overflow-tooltip prop="year" label="年份"></el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="方案">
        <template slot-scope="scope">{{'方案'+scope.row.name}}</template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip prop="createTime" label="测算时间"></el-table-column>
      <el-table-column align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      width="1200px"
      style="height:100%;"
      :fullscreen="true"
      :modal-append-to-body="false"
    >
     <ResultContent :resultName="programmeName"></ResultContent>
    </el-dialog>
  </div>
</template>
<script>
import { getResultList, deleteResult } from "@/assets/api/index.js";
import ResultContent from "@/components/planningTools/resultContent/ResultContent.vue";
export default {
  name: "MeasuringHistory",
  data() {
    return {
      tableLoading: false,
      tableDate: [],
      dialogTitle: "",
      programmeName: "",
      addDialogVisible: false
    };
  },
  components: {
    ResultContent
  },
  methods: {
    getResultList() {
      getResultList().then(res => {
        if (res.ok) {
          this.tableDate = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleClick(row) {
      this.programmeName = row.name;
      this.dialogTitle = "方案" + row.name;
      this.addDialogVisible = true;
    },
    //删除方案
    handleDel(row) {
      deleteResult(row).then(res => {
        if (res.ok) {
          this.$message.success('删除成功');
          this.getResultList();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  created() {
    this.getResultList();
  }
};
</script>
<style lang="less" scoped>
.measuringHistory {
  height: 100%;
}
</style>