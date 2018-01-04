<template>
  <div class="mt20 timer-com">
    <el-radio-group v-model="timeSlot" size="small">
      <el-radio-button label="toDay">今天</el-radio-button>
      <el-radio-button label="yesterday">昨天</el-radio-button>
      <el-radio-button label="week">近一周</el-radio-button>
      <el-radio-button label="month">近一月</el-radio-button>
      <!--<el-radio-button label="halfYear">近半年</el-radio-button>-->
      <!--<el-radio-button label="year">近一年</el-radio-button>-->
    </el-radio-group>
    <span class="split"></span>
    <div class="timer">
      <el-date-picker
        v-model="startTime"
        type="date"
        @change="changeStart"
        placeholder="选择日期" size="small">
      </el-date-picker>
      <span class="trim">至</span>
      <el-date-picker
        v-model="endTime"
        @change="changeEnd"
        type="date"
        placeholder="选择日期" size="small">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  import Moment from 'moment'
  export default {
    props: {
      value: {
        type: String,
        default: "month"
      }
    },
    data () {
      return {
        timeSlot: this.value,
        startTime: null,
        startTimeOld: null,
        endTime: null,
        endTimeOld: null,
      }
    },
    watch: {
      timeSlot(val){
        this.init(val);
        this.$emit("input", val);
        this.$emit("changeTime", (Date.parse(this.startTime) / 1000), (Date.parse(this.endTime) / 1000))
      },
      startTime(val,oldVal){
        this.startTimeOld = oldVal;
      },
      endTime(val,oldVal){
        this.endTimeOld = oldVal;
      }
    },
    created(){

    },
    mounted(){
      this.init(this.timeSlot);
      this.$emit("changeTime", (Date.parse(this.startTime) / 1000), (Date.parse(this.endTime) / 1000))
    },
    methods: {
      changeStart(val){
        val.setHours(0)
        val.setMinutes(0)
        val.setSeconds(0)
        if (!Moment(val).isBefore(this.endTime)) {
          this.startTime = this.startTimeOld;
          this.$message.error("开始时间不能大于结束时间")
          return false
        }
        this.startTime = val;
        this.$emit("changeTime", (Date.parse(this.startTime) / 1000), (Date.parse(this.endTime) / 1000))
      },
      changeEnd(val){
        val.setHours(23)
        val.setMinutes(59)
        val.setSeconds(59)
        if (Moment(val).isBefore(this.startTime)) {
          this.endTime = this.endTimeOld;
          this.$message.error("结束时间不能小于开始时间")
          return false
        }
        this.endTime = val;
        this.$emit("changeTime", (Date.parse(this.startTime) / 1000), (Date.parse(this.endTime) / 1000))
      },
      init(val){
        if (!val) return false;

        var timeArr = [];
        var timeObj = {
          'toDay': Moment().startOf('days'),
          'yesterday': Moment().startOf('days').subtract(1, 'days'),
          'week': Moment().startOf('days').subtract(1, 'weeks').add(1, 'days'),
          'month': Moment().startOf('days').subtract(30, 'days'),
          'halfYear': Moment().startOf('days').subtract(0.5, 'years').add(1, 'days'),
          'year': Moment().startOf('days').subtract(1, 'years').add(1, 'days')
        }
        timeArr[0] = timeObj[val];
        timeArr[1] = Moment().endOf('days');
        if (val == "yesterday") {
          timeArr[1] = Moment().endOf('days').subtract(1, 'days');
        }
        this.startTime = new Date((Moment(timeArr[0]).unix()) * 1000)
        this.endTime = new Date((Moment(timeArr[1]).unix()) * 1000)
        this.$emit("changeTime", (Date.parse(this.startTime) / 1000), (Date.parse(this.endTime) / 1000))
      }
    }
  }
</script>

<style scoped>
  .el-radio-group{float: left}
  .split{margin:0 5px;width: 1px;height: 32px;background-color:#d6d9ea;display: block;float: left}
  .timer{float: left}
</style>
