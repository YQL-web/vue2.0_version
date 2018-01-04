<template>
  <label class="el-switch" :class="{ 'is-disabled': disabled, 'el-switch--wide': hasText, 'is-checked': checked }">
    <div class="el-switch__mask" v-show="disabled"></div>
    <input
      class="el-switch__input"
      :class="{ 'allow-focus': allowFocus }"
      type="checkbox"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      ref="input"
      :name="name"
      :true-value="onValue"
      :false-value="offValue"
      :disabled="disabled">
    <span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }" @click="setFocus">
      <span class="el-switch__button" :style="{ transform }"></span>
    </span>
    <transition name="label-fade">
      <div
        class="el-switch__label el-switch__label--left"
        v-show="checked"
        :style="{ 'width': coreWidth + 'px' }">
        <i :class="[onIconClass]" v-if="onIconClass"></i>
        <span v-if="!onIconClass && onText">{{ onText }}</span>
      </div>
    </transition>
    <transition name="label-fade">
      <div
        class="el-switch__label el-switch__label--right"
        v-show="!checked"
        :style="{ 'width': coreWidth + 'px' }">
        <i :class="[offIconClass]" v-if="offIconClass"></i>
        <span v-if="!offIconClass && offText">{{ offText }}</span>
      </div>
    </transition>
  </label>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 0
      },
      onIconClass: {
        type: String,
        default: ''
      },
      offIconClass: {
        type: String,
        default: ''
      },
      onText: {
        type: String,
        default: 'ON'
      },
      offText: {
        type: String,
        default: 'OFF'
      },
      onColor: {
        type: String,
        default: ''
      },
      offColor: {
        type: String,
        default: ''
      },
      onValue: {
        type: [Boolean, String, Number],
        default: true
      },
      offValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      allowFocus: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        coreWidth: this.width
      };
    },
    created() {
      if (!~[this.onValue, this.offValue].indexOf(this.value)) {
        this.$emit('input', this.offValue);
      }
    },
    computed: {
      checked() {
        return this.value === this.onValue;
      },
      hasText() {
        /* istanbul ignore next */
        return this.onText || this.offText;
      },
      transform() {
        return this.checked ? `translate(${ this.coreWidth - 20 }px, 2px)` : 'translate(2px, 2px)';
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.onColor || this.offColor) {
          this.setBackgroundColor();
        }
      }
    },
    methods: {
      handleChange(event) {
        this.$emit('input', !this.checked ? this.onValue : this.offValue);
        this.$emit('change', !this.checked ? this.onValue : this.offValue);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          this.$refs.input.checked = this.checked;
        });
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.onColor : this.offColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      setFocus() {
        // set focus on input
        if (this.allowFocus) {
          this.$refs.input.focus();
        }
      },
      handleBlur(event) {
        if (this.allowFocus) {
          this.$emit('blur', event);
        }
      },
      handleFocus(event) {
        if (this.allowFocus) {
          this.$emit('focus', event);
        }
      }
    },
    mounted() {
      /* istanbul ignore if */
      if (this.width === 0) {
        this.coreWidth = this.hasText ? 58 : 46;
      }
      if (this.onColor || this.offColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  };
</script>
<style scope>
  .el-switch, .el-switch__label, .el-switch__label * {
    font-size: 14px;
    display: inline-block
  }

  .el-switch {
    position: relative;
    line-height: 22px;
    height: 22px;
    vertical-align: middle
  }

  .el-switch .label-fade-enter, .el-switch .label-fade-leave-active {
    opacity: 0
  }

  .el-switch.is-disabled .el-switch__core {
    border-color: #e4e8f1 !important;
    background: #e4e8f1 !important
  }

  .el-switch.is-disabled .el-switch__core span {
    background-color: #fbfdff !important
  }

  .el-switch.is-disabled .el-switch__core ~ .el-switch__label * {
    color: #fbfdff !important
  }

  .el-switch.is-checked .el-switch__core {
    border-color: #20a0ff;
    background-color: #20a0ff
  }

  .el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label {
    cursor: not-allowed
  }

  .el-switch__core, .el-switch__label {
    width: 46px;
    height: 22px;
    cursor: pointer
  }

  .el-switch__label {
    transition: .2s;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2
  }

  .el-switch__label * {
    line-height: 1;
    top: 6px;
    position: absolute;
    color: #fff
  }

  .el-switch__label--left i {
    left: 6px
  }

  .el-switch__label--right i {
    right: 6px
  }

  .el-switch__input {
    display: none
  }

  .el-switch__input.allow-focus {
    z-index: 0;
    display: inline;
    display: initial;
    position: absolute;
    left: 0;
    top: 0;
    outline: 0;
    opacity: 0
  }

  .el-switch__input.allow-focus:focus + .el-switch__core {
    box-shadow: 0 0 2px #20a0ff
  }

  .el-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    border: 1px solid #bfcbd9;
    outline: 0;
    border-radius: 12px;
    box-sizing: border-box;
    background: #bfcbd9;
    transition: border-color .3s, background-color .3s;
    z-index: 1
  }

  .el-switch__core .el-switch__button {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 100%;
    transition: transform .3s;
    width: 16px;
    height: 16px;
    background-color: #fff
  }

  .el-switch--wide .el-switch__label.el-switch__label--left span {
    left: 10px
  }

  .el-switch--wide .el-switch__label.el-switch__label--right span {
    right: 10px
  }
</style>
