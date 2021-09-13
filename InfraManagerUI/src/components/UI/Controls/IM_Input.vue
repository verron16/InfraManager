<template>
  <input
    class="im-input"
    type="text"
    :placeholder="placeholder"
    :class="className"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "IM_Input",
  props: {
    placeholder: String,
    className: String,
  },
};
</script>

<style lang="scss">
.im-input {
  padding: 5px;
  outline: 1px solid #bdd0da;
  border: none;
  background: white;
  width: calc(100% - 12px);
  color: #1b1b1b;
  &::placeholder {
    font-size: 12px;
    line-height: 14px;
    color: #9d9e9e;
  }

  &:focus {
    outline: 2px solid #81aef0;
  }
}

.field__writing {
  background: #ffe7e7;
}
</style>
