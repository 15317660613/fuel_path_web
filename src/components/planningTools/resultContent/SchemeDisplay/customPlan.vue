<template>
  <div class="customPlan">
    <div class="tableContent">
      <vue-scroll>
        <el-table
          :data="tableDate"
          style="width: 100%"
          :header-cell-style="{background:'#679BD0',color:'#fff'}"
          height="440"
          v-loading="tableLoading"
          border
          align="center"
        >
          <el-table-column align="center" show-overflow-tooltip prop="p3" label="年份"></el-table-column>
          <el-table-column align="center" show-overflow-tooltip label="方案">
            <template slot-scope="scope">
              <el-select v-model="scope.row.name" placeholder="请选择方案" @change="CheckedBuildings">
                <el-option
                  v-for="item in filterSelect(selectList,scope.row.p3)"
                  :key="item.value"
                  :label="'方案'+item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="calcBtn" @click="getSelect">方案计算</el-button>
      </vue-scroll>
    </div>
    <div class="echartContent">
      <v-chart ref="meterChart" :autoresize="true" :options="meterOption" />
    </div>
  </div>
</template>

<script>
import { getResultList, getSelect } from "@/assets/api/index.js";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
// import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
export default {
  name: "CustomPlan",
  data() {
    return {
      tableDate: [
        {
          p3: 2020,
        },
        {
          p3: 2021,
        },
        {
          p3: 2022,
        },
        {
          p3: 2023,
        },
        {
          p3: 2024,
        },
        {
          p3: 2025,
        },
      ],
      selectList: [],
      tableLoading: false,
      meterOption: {
        legend: {
          data: ["实际值", "目标值", "达标值", "CAFC积分"],
          orient: "vertical", //垂直显示
          y: "center", //延Y轴居中
          x: "right", //居右显示
        },
        grid: {
          right: 180,
        },
        tooltip: {},
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
    getResultList() {
      getResultList().then((res) => {
        if (res.ok) {
          this.selectList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getSelect() {
      let option = {};
      option.fa20 = this.tableDate[0].name;
      option.fa21 = this.tableDate[1].name;
      option.fa22 = this.tableDate[2].name;
      option.fa23 = this.tableDate[3].name;
      option.fa24 = this.tableDate[4].name;
      option.fa25 = this.tableDate[5].name;
      getSelect(option).then((res) => {
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
    },
    filterSelect(list,condition){
       return list.filter(item=>{
        return item.year == condition
       })
    },
    CheckedBuildings() {},
  },
  created() {
    this.getResultList();
  },
};
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.customPlan {
  display: flex;
  margin-top: 10px;
  height: 100%;
  .tableContent {
    width: 500px;
    height: 100%;
    overflow: auto;
    // > div {
    //   height: 500px;
    // }
  }
  .calcBtn {
    margin-top: 10px;
    margin-bottom: 20px;
    float: right;
  }
  .echartContent {
    flex: 1;
  }
}
</style>