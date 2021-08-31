<template>
  <div>
    <a-spin>
      <a-icon
        slot="indicator"
        type="loading"
        style="
          font-size: 50px;
          color: #686868;
          position: absolute;
          left: 50%;
          top: 50%;
        "
        spin
      />
    </a-spin>
  </div>
</template>
<script>
export default {
  name: "Spinner",
};
</script>
