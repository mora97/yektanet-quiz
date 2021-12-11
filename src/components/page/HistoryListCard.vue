<template>
  <div
    :class="[
      styles.shadow,
      styles.positionRelative,
      styles.gridWrapper,
      styles.gridRow,
      styles.minHeight50,
      styles.pX4,
    ]"
  >
    <div
      :class="[
        styles.girdCol6,
        styles.textCenter,
        styles.pY5,
        styles.smTextRight,
      ]"
    >
      <h3 :class="[styles.maxWidth130]">{{ history.title }}</h3>
    </div>
    <div
      :class="[
        styles.textCenter,
        styles.pY5,
        styles.smTextRight,
        styles.smFlexRowStart,
      ]"
    >
      <span :class="[styles.smShow, styles.mdHide]">نام تغییر دهنده:</span>
      <span :class="[styles.mX3]">{{ history.name }}</span>
    </div>
    <div
      :class="[
        styles.textCenter,
        styles.pY5,
        styles.smTextRight,
        styles.smFlexRowStart,
      ]"
    >
      <span :class="[styles.smShow, styles.mdHide]">نوع فیلد:</span>
      <span :class="[styles.mX3, styles.textCenter]">{{ history.field }}</span>
    </div>
    <div :class="[styles.textCenter, styles.pY5, styles.smTextRight]">
      {{ history.new_value }}
    </div>
    <div :class="[styles.textCenter, styles.pY5, styles.smTextRight]">
      {{ history.old_value }}
    </div>
    <div :class="[styles.positionAbsolute, styles.left5, styles.top5]">
      <span>{{ history.date }}</span>
    </div>
    <Icon
      name="star"
      :color="hasStar ? 'Yellow' : 'Gray'"
      @click="setStar(history.id)"
      :class="[styles.positionAbsolute, styles.left5, styles.bottom0]"
    />
  </div>
</template>

<script>
import styles from "@styles";
import { ref, onMounted, computed } from "@vue/runtime-core";
import Icon from "@uikit/Icon.vue";

export default {
  name: "HistoryListCard",
  components: { Icon },
  props: {
    history: {
      required: true,
    },
  },
  setup(props) {
    const staredHistories = ref([]);
    const hasStar = ref(false);

    const setStar = (hisotryId) => {
      if (staredHistories.value.includes(hisotryId)) {
        staredHistories.value = staredHistories.value.filter(
          (id) => id !== hisotryId
        );
      } else {
        staredHistories.value.push(hisotryId);
      }
      hasStar.value = !hasStar.value;
      localStorage["stars"] = JSON.stringify(staredHistories.value);
    };

    onMounted(() => {
      if (localStorage["stars"]) {
        staredHistories.value = JSON.parse(localStorage["stars"]);
        hasStar.value = staredHistories.value.includes(props.history.id);
      }
    });

    return {
      styles,
      setStar,
      staredHistories,
      hasStar,
    };
  },
};
</script>
