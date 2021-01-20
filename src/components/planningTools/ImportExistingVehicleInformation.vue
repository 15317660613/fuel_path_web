<template>
  <div>
    <div class="handle">
      <el-select v-model="exportYear" placeholder="请选择">
        <el-option v-for="item in exportYearOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button @click="uploadVehiclesData" type="primary">导入</el-button>

      <el-button @click="downLoadTemplate">下载模板</el-button>
      <div class="rightBtn">
        <el-button type="primary" :disabled="saveDisabled" @click="saveCxxxData">保存</el-button>
        <el-button @click="addLine">新增</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#679BD0',color:'#fff'}"
        height="100%"
        v-loading="tableLoading"
        border
        :span-method="objectSpanMethod"
        align="center"
      >
        <el-table-column align="center" show-overflow-tooltip prop="cxbh" label="车型编号"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="cxmc" label="车型名称"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="zcbh" label="总成编号"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="rylx" label="燃料类型"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="pl" label="排量"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="qgs" label="气缸数"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="jqfs" label="进气方式"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="gyfs" label="供油方式"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="xhfs" label="循环方式"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="kbqmjs" label="可变气门技术"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="sfdztg" label="是否搭载停缸"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="sfdzqt" label="是否搭载启停"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="sfdzegr" label="是否搭载EGR"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="bsqxs" label="变速器形式"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="bsqdws" label="变速器档位数"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="hdlb" label="混动类别"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="hdgx" label="混动构型"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="dqdqjs" label="电子电气技术"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="jjsjs" label="渐进式技术"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="zbzl" label="整备质量"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="zwps" label="座位排数"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="yh" label="油耗"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="cdxh" label="纯电续航"></el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="总成占比(%)">
          <template slot-scope="scope">{{scope.row.zczb|zczbFormat}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="220">
          <template slot-scope="scope">
            <el-button
              v-if="tableMerge[scope.$index]"
              @click="addDownLine(scope)"
              type="text"
              size="small"
            >向下插入</el-button>
            <el-button @click="handleClick(scope)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDel(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addDialogVisible"
      width="1200px"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :before-close="closeDialog"
    >
      <el-form :model="formEdit" class="formEdit" ref="formEdit" :rules="rules" label-width="150px">
        <el-col :span="8">
          <el-form-item label="车型名称" prop="cxmc">
            <el-input
              :disabled="dialogType!=='add'"
              v-model="formEdit.cxmc"
              :title="formEdit.cxmc"
              maxlength="50"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="燃料类型" prop="rylx">
            <el-select
              v-model="formEdit.rylx"
              :title="formEdit.rylx"
              clearable
              filterable
              placeholder="请选择"
              @change="changeRylx"
            >
              <el-option label="汽油" value="汽油"></el-option>
              <el-option label="柴油" value="柴油"></el-option>
              <el-option label="混动" value="混动"></el-option>
              <el-option label="纯电动" value="纯电动"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排量" prop="pl">
            <el-input
              v-model="formEdit.pl"
              placeholder="请输入"
              :title="formEdit.pl"
              :disabled="formEdit.rylx === '纯电动'"
              maxlength="3"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="气缸数" prop="qgs">
            <el-select
              v-model="formEdit.qgs"
              :title="formEdit.qgs"
              clearable
              filterable
              :disabled="formEdit.rylx === '纯电动'"
              placeholder="请选择"
            >
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="12" value="12"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进气方式" prop="jqfs">
            <el-select
              v-model="formEdit.jqfs"
              :title="formEdit.jqfs"
              clearable
              filterable
              :disabled="formEdit.rylx === '纯电动'"
              placeholder="请选择"
            >
              <el-option label="自然吸气" value="自然吸气"></el-option>
              <el-option label="涡轮增压" value="涡轮增压"></el-option>
              <el-option label="机械增压" value="机械增压"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供油方式" prop="gyfs">
            <el-select
              v-model="formEdit.gyfs"
              :title="formEdit.gyfs"
              clearable
              :disabled="formEdit.rylx === '纯电动'"
              filterable
              placeholder="请选择"
            >
              <el-option label="多点电喷" value="多点电喷"></el-option>
              <el-option label="缸内直喷" value="缸内直喷"></el-option>
              <el-option label="混合喷射" value="混合喷射"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="循环方式" prop="xhfs">
            <el-select
              v-model="formEdit.xhfs"
              :title="formEdit.xhfs"
              clearable
              filterable
              multiple
              :disabled="formEdit.rylx === '纯电动'"
              collapse-tags
              placeholder="请选择"
            >
              <el-option label="奥拓循环" value="奥拓循环"></el-option>
              <el-option :disabled="diabledXhfs('米勒循环')" label="米勒循环" value="米勒循环"></el-option>
              <el-option :disabled="diabledXhfs('阿特金森循环')" label="阿特金森循环" value="阿特金森循环"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可变气门技术" prop="kbqmjs">
            <el-select
              v-model="formEdit.kbqmjs"
              :title="formEdit.kbqmjs"
              clearable
              filterable
              multiple
              :disabled="formEdit.rylx === '纯电动'"
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                :disabled="formEdit.kbqmjs&&formEdit.kbqmjs.length>0&&formEdit.kbqmjs.indexOf('无')===-1"
                label="无"
                value="无"
              ></el-option>
              <el-option :disabled="diabledKbqmjs('VVT')" label="VVT" value="VVT"></el-option>
              <el-option :disabled="diabledKbqmjs('VVL')" label="VVL" value="VVL"></el-option>
              <el-option :disabled="diabledKbqmjs('CVVT')" label="CVVT" value="CVVT"></el-option>
              <el-option :disabled="diabledKbqmjs('DVVT')" label="DVVT" value="DVVT"></el-option>
              <el-option :disabled="diabledKbqmjs('CVVD')" label="CVVD" value="CVVD"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否搭载停缸" prop="sfdztg">
            <el-select
              v-model="formEdit.sfdztg"
              :title="formEdit.sfdztg"
              clearable
              :disabled="formEdit.rylx === '纯电动'"
              filterable
              placeholder="请选择"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否搭载启停" prop="sfdzqt">
            <el-select
              v-model="formEdit.sfdzqt"
              :title="formEdit.sfdzqt"
              clearable
              filterable
              :disabled="formEdit.rylx === '纯电动'||formEdit.rylx === '混动'"
              placeholder="请选择"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否搭载EGR" prop="sfdzegr">
            <el-select
              v-model="formEdit.sfdzegr"
              :title="formEdit.sfdzegr"
              clearable
              filterable
              :disabled="formEdit.rylx === '纯电动'"
              placeholder="请选择"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变速器形式" prop="bsqxs">
            <el-select
              v-model="formEdit.bsqxs"
              :title="formEdit.bsqxs"
              clearable
              filterable
              :disabled="formEdit.rylx === '纯电动'"
              placeholder="请选择"
              @change="bsqxsChange"
            >
              <el-option label="MT" value="MT"></el-option>
              <el-option label="AT" value="AT"></el-option>
              <el-option label="CVT" value="CVT"></el-option>
              <el-option label="DCT" value="DCT"></el-option>
              <el-option label="AMT" value="AMT"></el-option>
              <el-option :disabled="formEdit.rylx !== '混动'" label="DHT" value="DHT"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="变速器档位数" prop="bsqdws">
            <el-select
              v-model="formEdit.bsqdws"
              :title="formEdit.bsqdws"
              :disabled="formEdit.bsqxs === 'CVT'||formEdit.rylx === '纯电动'||formEdit.bsqxs==='DHT'"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in bsqdwsOption"
                :disabled="disabledBsqdws(item)"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="混动类别" prop="hdlb">
            <el-select
              v-model="formEdit.hdlb"
              :title="formEdit.hdlb"
              :disabled="formEdit.rylx !== '混动'||formEdit.rylx === '纯电动'"
              clearable
              filterable
              placeholder="请选择"
              @change="hdlbchange"
            >
              <el-option label="MHEV" value="MHEV"></el-option>
              <el-option label="HEV" value="HEV"></el-option>
              <el-option label="PHEV" value="PHEV"></el-option>
              <el-option label="REEV" value="REEV"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="混动构型" prop="hdgx">
            <el-select
              v-model="formEdit.hdgx"
              :title="formEdit.hdgx"
              :disabled="formEdit.rylx !== '混动'||formEdit.hdlb == 'REEV'||formEdit.rylx === '纯电动'"
              clearable
              multiple
              collapse-tags
              filterable
              placeholder="请选择"
            >
              <el-option :disabled="diabledHdgx('P0')" label="P0" value="P0"></el-option>
              <el-option :disabled="diabledHdgx('P1')" label="P1" value="P1"></el-option>
              <el-option :disabled="diabledHdgx('P1')" label="P2" value="P2"></el-option>
              <el-option :disabled="diabledHdgx('P2.5')" label="P2.5" value="P2.5"></el-option>
              <el-option :disabled="diabledHdgx('P4')" label="P4" value="P4"></el-option>
              <el-option :disabled="diabledHdgx('功率分流')" label="功率分流" value="功率分流"></el-option>
              <el-option :disabled="diabledHdgx('串并联')" label="串并联" value="串并联"></el-option>
              <el-option :disabled="diabledHdgx('串联')" label="串联" value="串联"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电子电气技术" prop="dqdqjs">
            <el-select
              v-model="formEdit.dqdqjs"
              :title="formEdit.dqdqjs"
              clearable
              filterable
              multiple
              :disabled="formEdit.rylx === '纯电动'"
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                :disabled="formEdit.dqdqjs&&formEdit.dqdqjs.length>0&&formEdit.dqdqjs.indexOf('无')===-1"
                label="无"
                value="无"
              ></el-option>
              <el-option :disabled="formEdit.dqdqjs=='无'" label="电子涡轮" value="电子涡轮"></el-option>
              <el-option :disabled="formEdit.dqdqjs=='无'" label="电子水泵" value="电子水泵"></el-option>
              <el-option :disabled="formEdit.dqdqjs=='无'" label="电动助力转向" value="电动助力转向"></el-option>
              <el-option :disabled="formEdit.dqdqjs=='无'" label="高效电附件" value="高效电附件"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渐进式技术" prop="jjsjs">
            <el-select
              v-model="formEdit.jjsjs"
              :title="formEdit.jjsjs"
              :disabled="true"
              clearable
              filterable
              multiple
              collapse-tags
              placeholder="请选择"
            >
              <el-option
                :disabled="formEdit.jjsjs&&formEdit.jjsjs.length>0&&formEdit.jjsjs.indexOf('无')===-1"
                label="无"
                value="无"
              ></el-option>
              <el-option :disabled="formEdit.jjsjs=='无'" label="减少摩擦" value="减少摩擦"></el-option>
              <el-option :disabled="formEdit.jjsjs=='无'" label="减少风阻" value="减少风阻"></el-option>
              <el-option :disabled="formEdit.jjsjs=='无'" label="减少滚阻" value="减少滚阻"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="整备质量（kg）" prop="zbzl">
            <el-input
              v-model="formEdit.zbzl"
              :title="formEdit.zbzl"
              maxlength="4"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="座位排数" prop="zwps">
            <el-select
              v-model="formEdit.zwps"
              :title="formEdit.zwps"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option v-for="item in zwpsOption" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="油耗（L/100km）" prop="yh">
            <el-input v-model="formEdit.yh" :title="formEdit.yh" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纯电续航（km）" prop="cdxh">
            <el-input
              v-model="formEdit.cdxh"
              :disabled="formEdit.rylx!=='混动'&&formEdit.rylx!=='纯电动'"
              :title="formEdit.cdxh"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总成占比" prop="zczb">
            <el-input v-model="formEdit.zczb" :title="formEdit.zczb" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="formConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-upload
      ref="upload"
      class="pic-uploader"
      :action="action"
      :show-file-list="false"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :before-upload="onBeforeUpload"
      :on-success="handleSucess"
      :on-error="handleError"
    ></el-upload>
  </div>
</template>
<script>
import {
  login,
  getCxxxData,
  saveCxxxData,
  importCxxx,
} from "@/assets/api/index.js";
import config from "@/assets/config.js";
import { rulesCopy, rulesCdd, rulesHd } from "@/assets/rules.js";
// 非纯电动类型校验规则

export default {
  name: "ImportExistingVehicleInformation",
  data() {
    return {
      bsqdwsOption: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      zwpsOption: ["1", "2", "3", "4", "5", "6", "7", "8"], //座位排数
      exportYear: 2020,
      exportYearOptions: [2020, 2021, 2022, 2023, 2024, 2025],
      dialogType: "add",
      tableData: [],
      saveDisabled: true, //保存按钮的状态
      // cddFlag:false,//是否是纯电动
      action: config.API_CONFIG + "/common/cxxx/excel/upload", //长传接口地址
      rules: {},
      formEdit: {
        nf: "",
        tsfa: "",
        zczb: "",
        cdxh: "",
        yh: "",
        zwps: "",
        zbzl: "",
        dqdqjs: [],
        jjsjs: ["无"],
        hdgx: [],
        hdlb: "",
        bsqdws: "",
        bsqxs: "",
        sfdzegr: "",
        sfdzqt: "",
        sfdztg: "",
        kbqmjs: [],
        xhfs: [],
        gyfs: "",
        jqfs: "",
        qgs: "",
        pl: "",
        rylx: "",
        zcbh: "",
        cxmc: "",
        cxbh: "",
      },

      tableLoading: false, //表格载入loading控制
      loading: null, //loading服务
      dialogTitle: "新增车型信息",
      spliceIndex: 0, //插入的位置
      addDialogVisible: false, //新增弹窗是否显示
    };
  },
  methods: {
    //导入车型信息
    uploadVehiclesData() {
      this.$confirm("此操作将清空上次的导入或保存的数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs.upload.$refs["upload-inner"].handleClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    login() {
      let token = location.href.split("tokenId=")[1];
      if (token !== localStorage.getItem("token")) {
        login(token)
          .then((res) => {
            localStorage.setItem("token", token);
            localStorage.setItem("userInfor", res.data);
            this.getCxxxData();
          })
          .catch(() => {
            return;
          });
      } else {
        this.getCxxxData();
      }
    },
    //编辑
    handleClick(scope) {
      if (scope.row.rylx === "纯电动") {
        // this.cddFlag = true;
        this.rules = rulesCdd;
        this.isCcd();
      } else if (scope.row.rylx === "混动") {
        this.rules = rulesHd;
      } else {
        this.rules = rulesCopy;
      }
      this.formEdit = JSON.parse(JSON.stringify(scope.row));
      this.formEdit.kbqmjs =
        Array.isArray(this.formEdit.kbqmjs) || !this.formEdit.kbqmjs
          ? this.formEdit.kbqmjs
          : this.formEdit.kbqmjs.split(",");
      this.formEdit.hdgx =
        Array.isArray(this.formEdit.hdgx) || !this.formEdit.hdgx
          ? this.formEdit.hdgx
          : this.formEdit.hdgx.split(",");

      this.formEdit.dqdqjs =
        Array.isArray(this.formEdit.dqdqjs) || !this.formEdit.dqdqjs
          ? this.formEdit.dqdqjs
          : this.formEdit.dqdqjs.split(",");

      this.formEdit.jjsjs =
        Array.isArray(this.formEdit.jjsjs) || !this.formEdit.jjsjs
          ? this.formEdit.jjsjs
          : this.formEdit.jjsjs.split(",");
      this.formEdit.xhfs =
        Array.isArray(this.formEdit.xhfs) || !this.formEdit.xhfs
          ? this.formEdit.xhfs
          : this.formEdit.xhfs.split(",");
      this.formEdit.zczb = Number(
        (Number(this.formEdit.zczb) * 100).toFixed(1)
      );
      this.dialogType = "edit";
      this.spliceIndex = scope.$index;
      this.dialogTitle = "编辑车型信息";
      this.addDialogVisible = true;
    },
    //删除
    handleDel(scope) {
      this.$confirm("是否确认删除该行数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.splice(scope.$index, 1);
        this.saveDisabled = false;
      });
    },
    //返回当前年
    // currentYear() {
    //   let date = new Date();
    //   return date.getFullYear();
    // },
    //混动类别更改
    hdlbchange(value) {
      if (value == "REEV") {
        this.formEdit.hdgx = ["串联"];
      } else {
        this.formEdit.hdgx = [];
      }
    },
    //可变电器技术选择判断
    diabledKbqmjs(name) {
      let arr = ["VVT", "CVVT", "DVVT"];
      let flag = false;
      if (this.formEdit.kbqmjs && this.formEdit.kbqmjs.indexOf("无") !== -1) {
        //选择无
        return true;
      }
      arr.forEach((item) => {
        if (this.formEdit.kbqmjs && this.formEdit.kbqmjs.indexOf(item) !== -1) {
          if (
            arr.indexOf(name) !== -1 &&
            this.formEdit.kbqmjs.indexOf(name) === -1
          ) {
            flag = true;
            return false;
          }
        }
      });
      return flag;
    },
    //循环方式问题
    diabledXhfs(name) {
      let arr = ["米勒循环", "阿特金森循环"];
      let flag = false;
      arr.forEach((item) => {
        if (this.formEdit.xhfs && this.formEdit.xhfs.indexOf(item) !== -1) {
          if (
            arr.indexOf(name) !== -1 &&
            this.formEdit.xhfs.indexOf(name) === -1
          ) {
            flag = true;
            return false;
          }
        }
      });
      return flag;
    },
    //变速器更改
    bsqxsChange() {
      this.formEdit.bsqdws = "";
    },
    //变速器档位数
    disabledBsqdws(val) {
      let arr1 = ["4", "5", "6"];
      let arr2 = ["4", "5", "6", "7", "8", "9", "10"];
      let arr3 = ["6", "7", "8", "9"];
      if (this.formEdit.bsqxs === "MT") {
        if (arr1.indexOf(val) !== -1) {
          return false;
        } else {
          return true;
        }
      } else if (this.formEdit.bsqxs === "AT") {
        if (arr2.indexOf(val) !== -1) {
          return false;
        } else {
          return true;
        }
      } else if (this.formEdit.bsqxs === "DCT") {
        if (arr3.indexOf(val) !== -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    //是纯电动的时候，
    isCcd() {
      this.formEdit.pl = "";
      this.formEdit.qgs = "";
      this.formEdit.jqfs = "";
      this.formEdit.gyfs = "";
      this.formEdit.xhfs = [];
      this.formEdit.kbqmjs = [];
      this.formEdit.sfdzegr = "";
      this.formEdit.sfdzqt = "";
      this.formEdit.sfdztg = "";
      this.formEdit.bsqxs = "";
      this.formEdit.bsqdws = "";
      this.formEdit.hdlb = "";
      this.formEdit.hdgx = [];
      this.formEdit.dqdqjs = [];
    },
    diabledHdgx(name) {
      let arr = ["P0", "P1", "P2", "P2.5", "P3", "P4"];
      let arr1 = ["功率分流", "串并联", "串联"];
      let flag = false;
      if (this.formEdit.hdgx) {
        arr1.forEach((item) => {
          if (
            this.formEdit.hdgx &&
            this.formEdit.hdgx.indexOf(item) !== -1 &&
            this.formEdit.hdgx.indexOf(name) === -1
          ) {
            flag = true;
            return false;
          }
        });
        arr.forEach((item) => {
          if (this.formEdit.hdgx && this.formEdit.hdgx.indexOf(item) !== -1) {
            if (arr1.indexOf(name) !== -1) {
              flag = true;
              return false;
            }
          }
        });
      }
      return flag;
    },
    cancelAdd() {
      this.formEdit = {
        nf: "",
        tsfa: "",
        zczb: "",
        cdxh: "",
        yh: "",
        zwps: "",
        zbzl: "",
        dqdqjs: [],
        jjsjs: ["无"],
        hdgx: [],
        hdlb: "",
        bsqdws: "",
        bsqxs: "",
        sfdzegr: "",
        sfdzqt: "",
        sfdztg: "",
        kbqmjs: [],
        xhfs: [],
        gyfs: "",
        jqfs: "",
        qgs: "",
        pl: "",
        rylx: "",
        zcbh: "",
        cxmc: "",
        cxbh: "",
      };
      this.$nextTick(() => {
        this.$refs.formEdit.clearValidate();
        this.addDialogVisible = false;
      });
    },
    //燃料类型改变
    changeRylx(value) {
      if (value !== "混动") {
        this.formEdit.hdlb = "";
        this.formEdit.hdgx = [];
      } else {
        this.formEdit.sfdzqt = "是";
      }
      if (value === "纯电动") {
        // this.cddFlag = true;
        this.rules = rulesCdd;
        this.isCcd();
      } else if (value === "混动") {
        this.rules = rulesHd;
      } else {
        this.rules = rulesCopy;
        // this.cddFlag = false;
      }
      //燃料类型是不是混动和纯电动，清空纯电续航
      if (value !== "纯电动" && value !== "混动") {
        this.formEdit.cdxh = "";
      }
      this.formEdit.bsqxs = "";
      this.$nextTick(() => {
        this.$refs.formEdit.clearValidate();
      });
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
          background: "rgba(0, 0, 0, 0.7)",
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
        importCxxx(res.data.fileId, this.exportYear)
          .then((res) => {
            if (res.ok) {
              this.getCxxxData();
              this.loading.close();
              this.$message.success("导入成功");
              this.saveDisabled = true;
            } else {
              this.loading.close();
              this.$message.error(res.message);
            }
          })
          .catch(() => {
            this.loading.close();
          });
      } else {
        this.loading.close();
        this.$message.error(res.message);
      }
    },
    handleError() {
      this.loading.close();
    },
    downLoadTemplate() {
      window.open(config.API_CONFIG + "/common/cxxx/template/export");
    },
    getCxxxData() {
      this.tableLoading = true;
      getCxxxData().then((res) => {
        if (res.ok) {
          this.tableData = res.data;
        } else {
          this.$message.error(res.message);
        }
        this.tableLoading = false;
      });
    },
    saveCxxxData() {
      let data = {
        cxxxEOS: this.tableData,
        year: this.exportYear,
      };
      saveCxxxData(data).then((res) => {
        if (res.ok) {
          this.$message.success("保存成功");
          this.saveDisabled = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    closeDialog(done) {
      this.formEdit = {
        nf: "",
        tsfa: "",
        zczb: "",
        cdxh: "",
        yh: "",
        zwps: "",
        zbzl: "",
        dqdqjs: [],
        jjsjs: ["无"],
        hdgx: [],
        hdlb: "",
        bsqdws: "",
        bsqxs: "",
        sfdzegr: "",
        sfdzqt: "",
        sfdztg: "",
        kbqmjs: [],
        xhfs: [],
        gyfs: "",
        jqfs: "",
        qgs: "",
        pl: "",
        rylx: "",
        zcbh: "",
        cxmc: "",
        cxbh: "",
      };
      this.$nextTick(() => {
        this.$refs.formEdit.clearValidate();
        done();
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
        two: spanTwoArr,
      };
    },
    addDownLine(scope) {
      this.rules = rulesCopy;
      this.addDialogVisible = true;
      this.dialogType = "downInsert";
      this.spliceIndex = scope.$index;
      this.formEdit.cxmc = this.tableData[this.spliceIndex].cxmc;
      this.formEdit.cxbh = this.tableData[this.spliceIndex].cxbh;
      this.formEdit.zcbh = Number(this.tableData[this.spliceIndex].zcbh) + 1;
    },
    addLine() {
      this.dialogType = "add";
      this.dialogTitle = "新增车型信息";
      this.rules = rulesCopy;
      this.addDialogVisible = true;
    },
    //  确认新增
    formConfirm() {
      this.$refs.formEdit.validate((valid) => {
        if (valid) {
          this.formEdit.kbqmjs = this.formEdit.kbqmjs
            ? this.formEdit.kbqmjs.toString()
            : this.formEdit.kbqmjs;
          this.formEdit.hdgx = this.formEdit.hdgx
            ? this.formEdit.hdgx.toString()
            : this.formEdit.hdgx;
          this.formEdit.dqdqjs = this.formEdit.dqdqjs
            ? this.formEdit.dqdqjs.toString()
            : this.formEdit.dqdqjs;
          this.formEdit.jjsjs = this.formEdit.jjsjs
            ? this.formEdit.jjsjs.toString()
            : this.formEdit.jjsjs;
          this.formEdit.xhfs = this.formEdit.xhfs
            ? this.formEdit.xhfs.toString()
            : this.formEdit.xhfs;
          this.formEdit.zczb =
            this.formEdit.zczb && (this.formEdit.zczb / 100).toString();
          if (this.dialogType == "add") {
            let cxbh = 0;
            if (this.tableData.length) {
              //判断是否有数据，没有从1开始
              this.tableData.forEach((item) => {
                if (Number(item.cxbh) > cxbh) {
                  cxbh = Number(item.cxbh);
                }
              });
            }
            cxbh += 1;
            this.formEdit.cxbh = cxbh.toString();
            this.formEdit.zcbh = "1";
            this.tableData.push(this.formEdit);
          } else if (this.dialogType == "downInsert") {
            this.tableData.splice(this.spliceIndex + 1, 0, this.formEdit);
          } else if (this.dialogType == "edit") {
            this.tableData.splice(this.spliceIndex, 1, this.formEdit);
          }
          this.formEdit = {
            nf: "",
            tsfa: "",
            zczb: "",
            cdxh: "",
            yh: "",
            zwps: "",
            zbzl: "",
            dqdqjs: [],
            jjsjs: ["无"],
            hdgx: "",
            hdlb: "",
            bsqdws: "",
            bsqxs: "",
            sfdzegr: "",
            sfdzqt: "",
            sfdztg: "",
            kbqmjs: [],
            xhfs: [],
            gyfs: "",
            jqfs: "",
            qgs: "",
            pl: "",
            rylx: "",
            zcbh: "",
            cxmc: "",
            cxbh: "",
          };
          this.$nextTick(() => {
            this.$refs.formEdit.clearValidate();
          });
          this.saveDisabled = false;
          this.addDialogVisible = false;
        }
      });
    },
    //合并单元格
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.setTable(this.tableData, "cxbh").one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 1) {
        const _row = this.setTable(this.tableData, "cxmc").one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
  filters: {
    zczbFormat(zczb) {
      return (Number(zczb) * 100).toFixed(1);
    },
  },
  computed: {
    //构造显示插入的标识
    tableMerge() {
      return this.tableData.map((item, index) => {
        if (this.tableData.length > index + 1) {
          return item.cxbh !== this.tableData[index + 1].cxbh;
        } else {
          return true;
        }
      });
    },
  },
  created() {
    this.login();
  },
};
</script>
<style lang="less" scoped>
.handle {
  margin-top: 10px;
  .rightBtn {
    float: right;
  }
}
.table-content {
  margin-top: 10px;
  height: calc(100% - 50px);
}
.el-form .el-input {
  width: 200px;
  margin-right: 5px;
}
.el-form .el-select {
  width: 200px;
  margin-right: 5px;
}
.el-select {
  margin-right: 10px;
}
.dialog-footer {
  text-align: center;
}
.pic-uploader {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}
/deep/.el-table__body .el-table__row.hover-row td {
  background-color: #ffffff;
}
/deep/.el-table tbody tr:hover > td {
  background-color: #ffffff !important;
}
</style>