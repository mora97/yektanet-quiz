<template>
  <div>
    <HistoriesHeader :class="[styles.smHide]" />
    <div ref="historiesListRef" :class="[styles.historiesWrapper, styles.shadow, styles.borderRadius4, styles.mT10]">
      <HistoryListCard
        v-for="history in histories"
        :key="history.id"
        :history="history"
        :class="[styles.mY5, styles.borderRadius4]"
      />
    </div>
  </div>
</template>

<script>
import HistoryListCard from "./HistoryListCard.vue";
import HistoriesHeader from "./HistoriesHeader.vue";
import styles from "@styles";
import { onMounted, ref } from 'vue';

export default {
  components: { HistoryListCard, HistoriesHeader },
  name: "HistroyList",
  props: {
    histories: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const historiesListRef = ref(null)
    let scrollBottom = false

    onMounted(() => {
      historiesListRef.value.addEventListener('scroll', () => {
        scrollBottom = historiesListRef.value.scrollTop > (historiesListRef.value.scrollHeight - historiesListRef.value.offsetHeight - 100)
        if (scrollBottom) {
          emit('load-more-emit')
        }
      })
    })
    
    return {
      styles,
      historiesListRef
    };
  },
};
</script>
