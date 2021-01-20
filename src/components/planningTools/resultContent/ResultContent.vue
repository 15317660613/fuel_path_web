<template>
  <el-tabs v-model="editableTabsValue" type="card">
    <el-tab-pane lazy label="列表" name="列表">
      <ResultList :resultName="resultName" />
    </el-tab-pane>
    <el-tab-pane lazy label="方案" name="方案">
      <SchemeDisplay :resultName="resultName" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ResultList from "@/components/planningTools/resultContent/ResultList";
import SchemeDisplay from "@/components/planningTools/resultContent/SchemeDisplay";
export default {
  name: "ResultContent",
  props: ["resultName"],
  data() {
    return {
      editableTabsValue: "列表"
    };
  },
  components: {
    ResultList,SchemeDisplay
  }
};
</script>
<style lang="less" scoped>
</style>