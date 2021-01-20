<template>
  <div class="content">
    <el-tabs v-model="editableTabsValue" type="card">
      <el-tab-pane lazy label="合规运算工具" name="1">
        <template v-if="editableTabsValue ==='1' ">
          <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
            <el-step title="现有车型信息导入"></el-step>
            <el-step title="整体规划信息导入"></el-step>
            <el-step title="模型运算"></el-step>
            <el-step title="输出结果"></el-step>
          </el-steps>
          <div class="component-content">
            <ImportExistingVehicleInformation v-if="active == 0"></ImportExistingVehicleInformation>
            <ImportOverallPlanningInformation v-if="active == 1"></ImportOverallPlanningInformation>
            <ModelOperation
              ref="modelOperation"
              @calculationSucess="calculationSucess"
              @getProgrammeName="getProgrammeName"
              @getYHComplete="getYHComplete"
              v-if="active == 2"
            ></ModelOperation>
            <OutputResults :programmeName="programmeName" v-if="active == 3"></OutputResults>
          </div>
          <div style="text-align:center">
            <el-button v-if="active>0" style="margin-top: 12px;" @click="pre">上一步</el-button>
            <el-button
              v-if="active==2"
              style="margin-top: 12px;"
              @click="fuelConsumptionCalculation"
            >油耗计算</el-button>
            <el-button
              v-if="active==2&&yhComplete"
              style="margin-top: 12px;"
              @click="startCalculation"
            >方案测算</el-button>
            <el-button v-if="active!==2&&active<3" style="margin-top: 12px;" @click="next">下一步</el-button>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane lazy label="测算历史" name="2">
        <MeasuringHistory v-if="editableTabsValue ==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ImportExistingVehicleInformation from "@/components/planningTools/ImportExistingVehicleInformation.vue";
import ImportOverallPlanningInformation from "@/components/planningTools/ImportOverallPlanningInformation.vue";
import ModelOperation from "@/components/planningTools/ModelOperation.vue";
import OutputResults from "@/components/planningTools/OutputResults.vue";
import MeasuringHistory from "@/components/planningTools/MeasuringHistory.vue";
import { calculate } from "@/assets/api/index.js";
export default {
  name: "PlanningTools",
  data() {
    return {
      editableTabsValue: "1",
      active: 0, //激活的步骤
      programmeName: "", //测算项目名称
      editableTabs: [
        {
          title: "测算工具",
          name: "1",
          content: "Tab 1 content",
        },
        {
          title: "测算历史",
          name: "2",
          content: "Tab 2 content",
        },
      ],
      yhComplete: false, //是否计算完油耗
      tabIndex: 2,
      loading: null,
    };
  },
  components: {
    ImportExistingVehicleInformation,
    ImportOverallPlanningInformation,
    ModelOperation,
    OutputResults,
    MeasuringHistory,
  },
  methods: {
    next() {
      //合规运算工具下一步
      if (this.active < 3) {
        if (this.active == 1) {
          this.loading = this.$loading({
            lock: true,
            text: "正在计算基础方案，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          calculate(0).then((res) => {
            if (res.ok) {
              this.active++;
              this.loading.close();
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          this.active++;
        }
      }
    },
    pre() {
      //合规运算工具上一步
      if (this.active > 0) {
        this.active--;
      }
    },
    //开始测算
    startCalculation() {
      this.$refs.modelOperation.calculate();
    },
    //油耗计算情况
    getYHComplete(val) {
      this.yhComplete = val;
    },
    //油耗计算
    fuelConsumptionCalculation() {
      if(!this.$refs.modelOperation.saveDisabled){
         this.$message.warning('请先保存方案！');
         return
      }
      this.$refs.modelOperation.getYHCalculate();
    },
    calculationSucess() {
      this.active = 3;
    },
    getProgrammeName(programmeName) {
      this.programmeName = programmeName.substr(2);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  padding: 15px;
  box-sizing: border-box;
  .component-content {
    height: calc(100% - 130px);
    > div {
      height: 100%;
    }
  }
}
</style>
