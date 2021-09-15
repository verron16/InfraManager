<template>
  <div class="im-input-radio__wrapper" :class="className">
    <input
      :id="id"
      type="radio"
      :value="value"
      class="im-input-radio"
      @change="$emit('change', $event.target.value)"
    />
    <label :for="id" class="im-input-radio__label" v-show="showLabel">{{
      label
    }}</label>
  </div>
</template>

<script>
export default {
  name: "IM_RadioButton",
  props: {
    id: String,
    showLabel: Boolean,
    label: String,
    value: String,
    className: String,
  },
};
</script>

<style lang="scss">
.im-input-radio {
  cursor: pointer;
  margin-right: 5px;
  &__wrapper {
    display: flex;
    align-items: center;
  }
  &__label {
    cursor: pointer;
    font-size: 12px;
    line-height: 14px;
    color: #2b2a29;
  }
}
</style>
