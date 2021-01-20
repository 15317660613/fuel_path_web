<template>
  <div class="schemeDisplay">
    <el-radio-group v-model="radio">
      <el-radio :label="0">合规成本最低方案</el-radio>
      <el-radio :label="1">政策风险最小方案</el-radio>
      <el-radio :label="2">自定义方案</el-radio>
    </el-radio-group>
    <div class="schemeDisplayComponents">
      <basic-plan v-if="radio === 0||radio ===1" :radio="radio" />
      <CustomPlan v-if="radio === 2" />
    </div>
  </div>
</template>
<script>
import BasicPlan from "@/components/planningTools/resultContent/SchemeDisplay/basicPlan";
import CustomPlan from "@/components/planningTools/resultContent/SchemeDisplay/customPlan";


export default {
  name: "SchemeDisplay",
  data() {
    return {
      tableLoading: false,
      selectList: [], //方案选择列表
      radio: 0
    };
  },
  components: {
    BasicPlan,
    CustomPlan
  },
  methods: {
    activeTabs(e) {
      console.log(e);
    },

  },
  created() {}
};
</script>
<style lang="less" scoped>
.schemeDisplay {
  height: calc(100%);
}
.el-tab-pane {
  height: calc(100% - 56px);
}
.schemeDisplayComponents {
  height: calc(100% - 17px);
}
</style>