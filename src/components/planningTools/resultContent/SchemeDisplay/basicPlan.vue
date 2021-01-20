<template>
  <div class="basicPlan">
    <div class="tableFull" :class="{tableContent:tableDate.length>1}">
      <el-table
        :data="tableDate"
        style="width: 100%"
        :header-cell-style="{background:'#679BD0',color:'#fff'}"
        height="100%"
        v-loading="tableLoading"
        border
        align="center"
      >
        <el-table-column align="center" show-overflow-tooltip prop="p3" label="年份"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="方案">
          <template slot-scope="scope">{{'方案'+scope.row.tsfa}}</template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="cafc" label="企业油耗实际值"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="tcafc" label="目标值"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="tcafc1" label="达标值"></el-table-column>
      </el-table>
    </div>
    <div v-if="tableDate.length>1" class="echartContent">
      <v-chart ref="meterChart" :autoresize="true" :options="meterOption" />
    </div>
  </div>
</template>

<script>
import { getCafcMin, getCostMin } from "@/assets/api/index.js";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
// import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
export default {
  name: "BasicPlan",
  props: ["radio"],
  data() {
    return {
      tableDate: [],
      tableLoading: false,
      meterOption: {
        legend: {
          data: ["实际值", "目标值", "达标值", "CAFC积分"],
          orient: "vertical", //垂直显示
          y: "center", //延Y轴居中
          x: "right", //居右显示
        },
        grid:{
          right:180
        },
        // tooltip: {},
        color: ["#5B9BD5", "#ED7D31", "#c4ccd3", "#FCC210"],
        xAxis: { type: "category" },
        yAxis: [
          {
            name: "L/100km",
            type: "value",
            splitLine: {
              show: false,
            },
          },
          {
            name: "积分",
            type: "value",
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          { name: "实际值", type: "bar", yAxisIndex: 0, data: [] },
          { name: "目标值", type: "bar", yAxisIndex: 0 },
          { name: "达标值", type: "bar", yAxisIndex: 0 },
          { name: "CAFC积分", type: "line", yAxisIndex: 1 },
        ],
      },
    };
  },
  methods: {
    getCafcMin() {
      this.tableLoading = true;
      getCafcMin().then((res) => {
        if (res.ok) {
          this.tableDate = res.data;
          let seriesDateLine = [];
          let names = [];
          let series1 = [];
          let series2 = [];
          let series3 = [];
          res.data.forEach((item) => {
            names.push(item.p3);
            series1.push(Number(item.cafc));
            series2.push(Number(item.tcafc));
            series3.push(Number(item.tcafc1));
            seriesDateLine.push(Number(item.cafcYh));
          });
          this.meterOption.xAxis.data = names;
          this.meterOption.series[0].data = series1;
          this.meterOption.series[1].data = series2;
          this.meterOption.series[2].data = series3;
          this.meterOption.series[3].data = seriesDateLine;
        } else {
          this.$message.error(res.error);
        }
        this.tableLoading = false;
      });
    },
    getCostMin() {
      this.tableLoading = true;
      getCostMin().then((res) => {
        if (res.ok) {
          this.tableDate = res.data;
          let seriesDateLine = [];
          let names = [];
          let series1 = [];
          let series2 = [];
          let series3 = [];
          res.data.forEach((item) => {
            names.push(item.p3);
            series1.push(Number(item.cafc));
            series2.push(Number(item.tcafc));
            series3.push(Number(item.tcafc1));
            seriesDateLine.push(Number(item.cafcYh));
          });
          this.meterOption.xAxis.data = names;
          this.meterOption.series[0].data = series1;
          this.meterOption.series[1].data = series2;
          this.meterOption.series[2].data = series3;
          this.meterOption.series[3].data = seriesDateLine;
        } else {
          this.$message.error(res.error);
        }
      });
      this.tableLoading = false;
    },
  },
  created() {
    if (this.radio === 0) {
      this.getCafcMin();
    } else if (this.radio === 1) {
      this.getCostMin();
    }
  },
  watch: {
    radio: function (val) {
      if (val === 0) {
        this.getCafcMin();
      } else if (val === 1) {
        this.getCostMin();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.basicPlan {
  display: flex;
  margin-top: 10px;
  height: 100%;
  .tableFull {
    flex: 1;
  }
  .tableContent {
    width: 500px;
  }
  .echartContent {
    flex: 1;
  }
}
</style>