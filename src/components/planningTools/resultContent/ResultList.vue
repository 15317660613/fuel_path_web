<template>
  <div class="resultList">
    <el-tabs v-model="editableTabsValue" type="card">
      <el-tab-pane lazy label="整体" name="整体">
        <el-table
          :data="allResult"
          style="width: 100%"
          :header-cell-style="{background:'#679BD0',color:'#fff'}"
          height="100%"
          v-loading="tableLoading"
          border
          align="center"
        >
          <el-table-column align="center" width="80" type="index" label="序号"></el-table-column>
          <el-table-column align="center" width="80" type="index" label="方案名称">
            <template slot-scope="scope">方案{{scope.row.tsfa}}</template>
          </el-table-column>
          <el-table-column align="center" prop="p3" show-overflow-tooltip label="年份">
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="cafc" label="企业油耗实际值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="tcafc" label="目标值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="tcafc1" label="达标值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="cafcYh" label="企业油耗积分"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="cafcNev" label="新能源积分"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="costUp" label="企业整体技术升级成本"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="costPay" label="企业积分抵偿成本"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane lazy label="车型" name="车型">
        <el-table
          :data="cxResult"
          style="width: 100%"
          :header-cell-style="{background:'#679BD0',color:'#fff'}"
          height="100%"
          border
          align="center"
        >
          <el-table-column align="center" width="80" type="index" label="序号"></el-table-column>
          <el-table-column align="center" width="80" type="index" label="方案名称">
            <template slot-scope="scope">方案{{scope.row.tsfa}}</template>
          </el-table-column>
          <el-table-column align="center" prop="p3" show-overflow-tooltip label="年份">
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="p1" label="车型"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="cafc" label="企业油耗实际值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="tcafc" label="目标值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="tcafc1" label="达标值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="cafcNev" label="新能源积分"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="costUp" label="企业整体技术升级成本"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane lazy label="总成" name="总成">
        <el-table
          :data="zcResult"
          style="width: 100%"
          :header-cell-style="{background:'#679BD0',color:'#fff'}"
          height="100%"
          border
          align="center"
        >
          <el-table-column align="center" width="80" type="index" label="序号"></el-table-column>
          <el-table-column align="center" width="80" type="index" label="方案名称">
            <template slot-scope="scope">方案{{scope.row.tsfa}}</template>
          </el-table-column>
          <el-table-column align="center" prop="p3" show-overflow-tooltip label="年份">
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="p1" label="车型"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="p2" label="总成"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="cafc" label="企业油耗实际值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="tcafc" label="目标值"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="tcafc1" label="达标值"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getResult } from "@/assets/api/index.js";
export default {
  name: "ResultList",
  props: ["resultName"],
  data() {
    return {
      editableTabsValue: "整体",
      allResult: [], //整体
      cxResult: [], //车型
      zcResult: [], //编号
      tableLoading: false,
      year: "",
    };
  },
  methods: {
    getResult() {
      this.tableLoading = true;
      getResult(this.resultName).then((res) => {
        if (res.ok) {
          this.allResult = [];
          this.allResult.push(res.data.allResult);
          this.year = res.data.year;
          this.cxResult = res.data.cxResult;
          this.zcResult = res.data.zcResult;
        } else {
          this.$message.error(res.message);
        }
        this.tableLoading = false;
      });
    },
  },
  created() {
    this.getResult();
  },
};
</script>
<style lang="less" scoped>
.resultList {
  height: calc(100%);
}
.el-tab-pane {
  height: calc(100% - 56px);
}
</style>