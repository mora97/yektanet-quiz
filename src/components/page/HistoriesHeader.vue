<template>
  <div :class="[styles.gridWrapper, styles.backgroundCard, styles.gridRow, styles.height20, styles.shadow, styles.pY5, styles.borderRadius5]">
    <h3 v-for="title in titles" :key="title" :class="styles.textCenter">
      {{ title }}
    </h3>
  </div>
</template>

<script>
import styles from "@styles";

export default {
  name: "HistoriesHeader",
  setup() {
    const titles = [
      "آگهی",
      "تغییر دهنده",
      "فیلد",
      "مقدار قدیم",
      "مقدار جدید",
      "تاریخ",
    ];

    return {
      styles,
      titles,
    };
  },
};
</script>

<style>
</style>