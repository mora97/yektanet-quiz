<template>
  <div>
    <HistoriesHeader :class="[styles.smHide]" />
    <div :class="[styles.historiesWrapper]">
      <HistoryListCard
        v-for="history in histories"
        :key="history.id"
        :history="history"
        :class="[styles.mY10, styles.borderRadius4]"
      />
    </div>
  </div>
</template>

<script>
import HistoryListCard from "./HistoryListCard.vue";
import HistoriesHeader from "./HistoriesHeader.vue";
import styles from "@styles";

export default {
  components: { HistoryListCard, HistoriesHeader },
  name: "HistroyList",
  props: {
    histories: {
      required: true,
    },
  },
  setup() {
    return {
      styles,
    };
  },
};
</script>
