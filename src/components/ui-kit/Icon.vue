<template>
  <div>
    <i v-html="icon" :class="styles[`icon${color}`]"></i>
  </div>
</template>

<script>
import icons from "@/static-data/icons";
import { computed } from "vue";
import styles from "@styles";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      default: [],
    },
  },
  setup(props) {
    const icon = computed(() => {
      return icons[props.name];
    });

    return {
      icon,
      styles,
    };
  },
};
</script>
