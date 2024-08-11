<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub() {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleChange(e) {
      const num = +e.target.value
      if (isNaN(num)) {
        Toast("输入的数值不合法")
        e.target.value = this.value
        return
      }
      if (num < 1 || String(num).indexOf('.')){
        Toast("输入的数字不合法")
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    },
    handleAdd() {
      this.$emit('input', this.value + 1)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;

  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }

  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
