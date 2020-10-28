<template>
  <div>
    <div class="weui-mask weui-animate-fade-in"></div>
    <div class="weui-half-screen-dialog weui-picker weui-animate-slide-up">
      <div class="weui-half-screen-dialog__hd">
        <div class="weui-half-screen-dialog__hd__side">
          <button
            @click="close"
            class="weui-icon-btn weui-icon-btn_close weui-picker__btn"
          >
            关闭
          </button>
        </div>
        <div class="weui-half-screen-dialog__hd__main">
          <strong
            class="weui-half-screen-dialog__title"
            style="color: #06ae56"
            >{{ nowChoose }}</strong
          >
        </div>
      </div>
      <div
        class="weui-half-screen-dialog__bd"
        @touchstart="touchStart"
        @touchmove="debTouchMove"
        @touchend="touchEnd"
      >
        <div class="weui-picker__bd">
          <div class="weui-picker__group">
            <div class="weui-picker__mask"></div>
            <div class="weui-picker__indicator"></div>
            <div
              class="weui-picker__content"
              :style="{ transform: `translate3d(0px, ${translateY}px, 0px)` }"
              ref="picker"
            >
              <div
                v-for="(item, index) in list"
                :key="item.value || index"
                class="weui-picker__item"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-half-screen-dialog__ft">
        <a
          @click="submit"
          class="weui-btn weui-btn_primary weui-picker__btn"
          id="weui-picker-confirm"
          data-action="select"
          >确定</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Picker",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(n, o) {
      console.log("pickerVisible", n);
    },
  },
  computed: {
    translateYBottomMax() {
      return 96;
    },
    translateYTopMax() {
      return -this.list.length * 48 + 144;
    },
    nowChoose() {
      return this.list[this.chooseItemIndex].label;
    },
  },
  data() {
    return {
      touchStartY: null, // 触摸开始Y值
      touchEndY: null, //触摸结束y值
      lastTouchMoveY: null, // touchMove事件中，上一次触发时的页面的y值
      deTimer: null,
      translateY: 96, // 偏移的高度 默认向下偏移96px
      itemHeight: 48, //单个元素的默认高度
      chooseItemIndex: 0, //所选元素的索引
    };
  },
  created() {},
  mounted() {},
  methods: {
    touchStart(e) {
      e.preventDefault();
    },
    touchMove(e) {
      if (!this.lastTouchMoveY) {
        this.lastTouchMoveY = e.changedTouches[0].pageY;
        return;
      }
      let moveY = e.changedTouches[0].pageY - this.lastTouchMoveY;
      this.lastTouchMoveY = e.changedTouches[0].pageY;
      this.moveList(moveY);
    },
    debTouchMove(e) {
      if (this.deTimer) return;
      this.deTimer = setTimeout(() => {
        this.touchMove(e);
        clearTimeout(this.deTimer);
        this.deTimer = null;
      }, 20);
    },
    touchEnd(e) {
      // touch事件结束后，偏移至就近的元素
      let index = this.nearWhichOne();
      // 更新所选的元素的索引
      this.chooseItemIndex = index;
    },
    moveList(y) {
      if (this.isLeave(y)) {
        return;
      }
      this.translateY += y;
    },
    /*
     * 判断元素是否离开了容器
     * @param y 本次偏移的距离
     * @return 离开了返回true
     */
    isLeave(y) {
      let sum = this.translateY + y;
      if (sum > this.translateYBottomMax) {
        return true;
      }
      if (sum < this.translateYTopMax) {
        return true;
      }
      return false;
    },
    // 判断偏移的数值，更靠近那一个元素
    // 并将之偏移到此元素
    // 返回此元素的index
    nearWhichOne() {
      let len = this.list.length;
      let tsl = this.translateY;
      let intTslItem = Math.floor(tsl / 48);

      // 新的偏移的格数
      // 判断靠近那个元素
      let newTsl = tsl / 48 - intTslItem >= 0.5 ? intTslItem + 1 : intTslItem;
      this.translateY = newTsl * 48;
      /*
       * 索引和偏移格数的关系
       *  x = 偏移格数
       *  y = 索引
       *  则：
       *  y = |x-2|
       */
      return Math.abs(newTsl - 2);
    },
    //确定
    submit() {
      // 将所选的index传递出去
      this.$emit("change", this.chooseItemIndex);
      this.close();
    },
    close() {
      this.$emit("update:visible", false);
    },
  },
};
</script>