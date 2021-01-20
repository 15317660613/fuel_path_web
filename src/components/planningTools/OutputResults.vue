<template>
  <div class="tabs-content">
    <ResultContent :resultName="programmeName"></ResultContent>
  </div>
</template>
<script>
import ResultContent from "@/components/planningTools/resultContent/ResultContent.vue";
export default {
  name: "OutputResults",
  props: ["programmeName"],
  data() {
    return {
      editableTabs: [],
      editableTabsValue: ""
    };
  },
  components: {
    ResultContent
  },
  methods: {},
  created() {}
};
</script>
<style lang="less" scoped>
.handle {
  margin-top: 10px;
  .rightBtn {
    float: right;
  }
}
.tabs-content {
  margin-top: 10px;
  height: 100%;
}
</style>