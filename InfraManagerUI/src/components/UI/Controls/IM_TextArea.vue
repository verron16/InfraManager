<template>
  <textarea
    :placeholder="placeholder"
    class="im-textarea"
    @input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: "IM_TextArea",
  props: {
    placeholder: String,
  },
};
</script>

<style lang="scss" scoped>
.im-textarea {
  outline: 1px solid #bdd0da;
  border: none;
  height: 60px;
  resize: none;
  width: calc(100% - 12px);
  padding: 5px;
  &:focus {
    outline: 2px solid #81aef0;
  }
}
</style>
