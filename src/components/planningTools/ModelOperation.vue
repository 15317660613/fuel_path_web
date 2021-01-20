<template>
  <div>
    <div class="tabs-content">
      <div class="handle">
        <el-button type="primary" :disabled="saveDisabled" @click="saveMxysData">保存</el-button>
        <el-button :disabled="!saveDisabled" @click="addProgramme">新增方案</el-button>
      </div>
      <el-tabs
        v-if="editableTabs.length"
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
        :before-leave="tabLeave"
      >
        <el-tab-pane
          :key="index"
          v-for="(item, index) in editableTabs"
          :label="programmeName(item)"
          :name="programmeName(item)"
          lazy
        >
          <template v-if="editableTabsValue == programmeName(editableTabs[index])">
            <Proprame
              v-if="!item.type"
              ref="proprame"
              class = "aaa"
              :programmeName="item"
              :programmeYear="programmeYear"
              @synchroniztion="synchroniztion"
              @getSaveBtnFlag="getSaveBtnFlag"
              @setProgrammeYear="setProgrammeYear"
            ></Proprame>
            <AddPropramme
              v-if="item.type == 'add'"
              class = "bbb"
              ref="addProprame"
              :programmeName="item"
              :programmeYear="addprogrammeYear"
              @synchroniztion="synchroniztion"
              @getSaveBtnFlag="getSaveBtnFlag"
            ></AddPropramme>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="新增方案年份选择"
      :visible.sync="addDialogVisible"
      :modal-append-to-body="false"
      width="320px"
    >
      <el-form label-width="60px">
        <el-form-item label="年份:" prop="cxmc">
          <el-select v-model="addprogrammeYear" placeholder="请选择">
            <el-option v-for="item in programmeYearOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = !addDialogVisible">取 消</el-button>
        <el-button type="primary" @click="addprogrammeConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getMxysName,
  deleteMxys,
  saveMxysData,
  getYHCalculate,
  calculate,
} from "@/assets/api/index.js";
import Proprame from "@/components/planningTools/propramme/Proprame.vue";
import AddPropramme from "@/components/planningTools/addPropramme/AddPropramme.vue";
export default {
  name: "ModelOperation",
  components: {
    Proprame,
    AddPropramme,
  },
  data() {
    return {
      editableTabs: [],
      programmeYear: "2020",
      addprogrammeYear: "2020", //新增选择
      programmeYearOptions: ["2020", "2021", "2022", "2023", "2024", "2025"],
      editableTabsValue: "",
      saveDisabled: true,
      addDialogVisible: false,
      tableData: [],
    };
  },
  methods: {
    getSaveBtnFlag(data) {
      this.saveDisabled = data;
      if(data == false){
         this.$emit("getYHComplete", false);
      }
    },
    //同步子组件修改后的数据
    synchroniztion(data) {
      this.tableData = data;
    },
    //同步方案的年月
    setProgrammeYear(year) {
      this.programmeYear = year;
    },
    getMxysName(currentName) {
      getMxysName().then((res) => {
        this.editableTabs = res.data;
        if (currentName) {
          this.editableTabsValue = currentName;
        } else {
          this.editableTabsValue = "方案" + res.data[0];
        }
      });
    },
    //tab前切换前回调
    tabLeave() {
      if (!this.saveDisabled) {
        this.$message.warning("请先保存方案");
        return false;
      }
      this.$emit("getYHComplete", false);
      return true;
    },
    addprogrammeConfirm() {
      if (this.editableTabs.length) {
        let max = Math.max.apply(null, this.editableTabs);
        this.editableTabs.push({
          type: "add",
          name: max + 1,
        });
        this.editableTabsValue = "方案" + (max + 1);
      } else {
        this.editableTabs.push({
          type: "add",
          name: 1,
        });
        this.editableTabsValue = "方案1";
      }
      this.addDialogVisible = false;
      this.$emit("getYHComplete", false);
      this.programmeYear = this.addprogrammeYear;
    },
    addProgramme() {
      this.addDialogVisible = true;
    },
    calculate() {
      calculate(this.editableTabsValue.substr(2)).then((res) => {
        if (res.ok) {
          this.$emit("calculationSucess", 4);
          this.$emit("getProgrammeName", this.editableTabsValue);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getYHCalculate() {
      getYHCalculate(this.editableTabsValue.substr(2)).then((res) => {
        if (res.ok) {
          this.$emit("getYHComplete", true);
            this.$refs.proprame[0].reload();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //溢出tab
    removeTab(targetName) {
      this.$confirm("是否确认删除该方案?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteMxys(targetName);
      });
    },
    //删除方案
    deleteMxys(targetName) {
      deleteMxys(targetName.substr(2)).then((res) => {
        if (res.ok) {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              //判断tab是object还是number,如果是object取其name属性
              if (typeof tab !== "object") {
                if ("方案" + tab === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab && typeof nextTab !== "object") {
                    activeName = "方案" + nextTab;
                  } else if (nextTab) {
                    activeName = "方案" + nextTab.name;
                  }
                }
              } else {
                if ("方案" + tab.name === targetName) {
                  let nextTab = tabs[index + 1] || tabs[index - 1];
                  if (nextTab && typeof nextTab !== "object") {
                    activeName = "方案" + nextTab;
                  } else if (nextTab) {
                    activeName = "方案" + nextTab.name;
                  }
                }
              }
            });
          }
          this.editableTabs = tabs.filter((tab) => {
            if (typeof tab !== "object") {
              return tab !== targetName.substr(2);
            } else {
              return tab.name !== Number(targetName.substr(2));
            }
          });
          if (this.editableTabs.length > 0) {
            this.editableTabsValue = "方案" + this.editableTabs[0];
          }
          this.saveDisabled = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    //保存方案
    saveMxysData() {
      let currentTabName = this.editableTabsValue;
      let option = {
        cxxxEOS: this.tableData,
        name: this.editableTabsValue.substr(2),
        year: this.programmeYear,
      };

      saveMxysData(option).then((res) => {
        if (res.ok) {
          this.$message.success("保存成功");
          this.saveDisabled = true;
          this.getMxysName(currentTabName);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //格式化方案名称
    programmeName(item) {
      if (typeof item !== "object") {
        return "方案" + item;
      } else {
        return "方案" + item.name;
      }
    },
  },
  created() {
    this.getMxysName();
    this.$emit("getYHComplete", false);
  },
};
</script>
<style lang="less" scoped>
/deep/.is-scrollable {
  width: calc(100% - 200px);
}
.tabs-content {
  margin-top: 10px;
  position: relative;
  height: 100%;
  .el-tabs {
    padding-top: 10px;
    box-sizing: border-box;
  }
  .handle {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
.dialog-footer {
  text-align: center;
}
</style>