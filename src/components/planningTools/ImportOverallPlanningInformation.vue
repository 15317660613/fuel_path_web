<template>
  <div>
    <div class="handle">
      <el-button  @click="uploadghData" type="primary">导入</el-button>
      <el-button @click="downLoadTemplate">下载模板</el-button>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="discountHeaderStyle"
        height="100%"
        border
        v-loading="tableLoading"
        :span-method="objectSpanMethod"
        align="center"
      >
        <el-table-column align="center" label="年份">
          <el-table-column align="center" label="总产量规划">
            <el-table-column align="center" prop="cxbh" label="编号"></el-table-column>
            <el-table-column align="center" prop="cxmc" label="车型名称"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="ghNow" label="当前">
          <el-table-column align="center" label-class-name="yearTitle" :label="clgh.ghNow">
            <template slot-scope="scope">{{scope.row.ghNow|ghFormat}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="gh20" label="2020">
          <el-table-column
            align="center"
            label-class-name="yearTitle"
            prop="gh20"
            :label="clgh.gh20"
          ><template slot-scope="scope">{{scope.row.gh20|ghFormat}}</template></el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="gh21" label="2021">
          <el-table-column
            align="center"
            label-class-name="yearTitle"
            prop="gh21"
            :label="clgh.gh21"
          ><template slot-scope="scope">{{scope.row.gh21|ghFormat}}</template></el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="gh22" label="2022">
          <el-table-column
            align="center"
            label-class-name="yearTitle"
            prop="gh22"
            :label="clgh.gh22"
          ><template slot-scope="scope">{{scope.row.gh22|ghFormat}}</template></el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="gh23" label="2023">
          <el-table-column
            align="center"
            label-class-name="yearTitle"
            prop="gh23"
            :label="clgh.gh23"
          ><template slot-scope="scope">{{scope.row.gh23|ghFormat}}</template></el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="gh24" label="2024">
          <el-table-column
            align="center"
            label-class-name="yearTitle"
            prop="gh24"
            :label="clgh.gh24"
          ><template slot-scope="scope">{{scope.row.gh24|ghFormat}}</template></el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="gh25" label="2025">
          <el-table-column
            align="center"
            label-class-name="yearTitle"
            prop="gh25"
            :label="clgh.gh25"
          ><template slot-scope="scope">{{scope.row.gh25|ghFormat}}</template></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <el-upload
      ref="upload"
      class="pic-uploader"
      :action="action"
      :show-file-list="false"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :before-upload="onBeforeUpload"
      :on-success="handleSucess"
    ></el-upload>
  </div>
</template>
<script>
import { getZtghData,importZtgh } from "@/assets/api/index.js";
import config from "@/assets/config.js";
export default {
  name: "importOverallPlanningInformation",
  data() {
    return {
      tableData: [],
      tableLoading: false, //table的loading动画
      loading:null,//上传动画服务初始化
      action: config.API_CONFIG + "/common/ztgh/excel/upload", //长传接口地址
      // 总产量规划
      clgh: {
        gh25: "",
        gh24: "",
        gh23: "",
        gh22: "",
        gh21: "",
        gh20: "",
        ghNow: ""
      },
      addDialogVisible: false //新增弹窗是否显示
    };
  },
  methods: {
    //控制表头显示
    discountHeaderStyle({ rowIndex }) {
      if (rowIndex == 2) {
        return { display: "none" };
      } else {
        return { background: "#679BD0", color: "#fff" };
      }
    },

    handleClick(row) {
      this.$set(row, "isEdit", true);
    },
        //上传之前调用
    onBeforeUpload(file) {
      const fileType =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        "application/vnd.ms-excel";
      if (!fileType) {
        this.$message.error("请上传正确格式文件!");
      }
      if (fileType) {
        this.loading = this.$loading({
          lock: true,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        return true;
      } else {
        return false;
      }
    },
        //上传完成回调
    handleSucess(res) {
      if (res.ok) {
        this.loading.text = "上传成功,开始导入校验...";
        importZtgh(res.data.fileId).then(res => {
          if (res.ok) {
            this.getZtghData();
            this.loading.close();
            this.$message.success("导入成功");
            this.saveDisabled = true;
          } else {
            this.$message.error(res.message);
          }
        }).catch(()=>{
          this.loading.close();
        });
      } else {
        this.$message.error(res.message)
      }
    },
    //下载模板
    downLoadTemplate() {
      window.open(config.API_CONFIG + "/common/ztgh/template/export");
    },
    //导入
    uploadghData(){
 //导入车型信息
      this.$confirm("此操作将清空上次的导入或保存的数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.upload.$refs["upload-inner"].handleClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //格式化表格数据合并单元格
    setTable(tableData, prop) {
      let spanOneArr = [],
        spanTwoArr = [],
        concatOne = 0,
        concatTwo = 0;
      tableData.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
          spanTwoArr.push(1);
        } else {
          if (item[prop] === tableData[index - 1][prop]) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
          if (item.name === tableData[index - 1].name) {
            //第二列和第16列需合并相同内容的判断条件
            spanTwoArr[concatTwo] += 1;
            spanTwoArr.push(0);
          } else {
            spanTwoArr.push(1);
            concatTwo = index;
          }
        }
      });
      return {
        one: spanOneArr,
        two: spanTwoArr
      };
    },
    getZtghData() {
      getZtghData().then(res => {
        if (res.ok) {
          this.tableData = res.data.filter(item => {
            return item.cxbh !== "0";
          });
          this.clgh = res.data[0];
        } else {
          this.$message.error(res.message);
        }
      });
    },
    addLine() {},
    //  确认新增
    addConfirm() {},
    //合并单元格
    //合并单元格
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.setTable(this.tableData, "cxbh").one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 1) {
        const _row = this.setTable(this.tableData, "cxbh").one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  },
  filters: {
    //百分百格式化
    ghFormat(gh) {
      return (Number(gh) * 100).toFixed(1) + "%";
    }
  },
  created() {
    this.getZtghData();
  }
};
</script>
<style lang="less" scoped>
.handle {
  margin-top: 10px;
}
.table-content {
  margin-top: 10px;
  height: calc(100% - 50px);
}
/deep/.yearTitle {
  background: #ffffff !important;
  color: #606266;
}
/deep/.el-table__body .el-table__row.hover-row td {
  background-color: #ffffff;
}
/deep/.el-table tbody tr:hover > td {
  background-color: #ffffff !important;
}
</style>