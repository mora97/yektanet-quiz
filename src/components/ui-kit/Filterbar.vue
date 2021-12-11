<template>
  <div :class="[styles.flexRowStart]">
    <YInput
      v-for="filter in filters"
      :key="filter"
      v-model="modelValue[filter.key]"
      :placeholder="filter.title"
      :class="[styles.mX5, styles.mB10]"
    />
    <YButton @click="filterItems" title="اعمال فیلتر" :class="[styles.mX5, styles.width70]" />
  </div>
</template>

<script>
import styles from "@styles";
import YButton from "./YButton.vue";
import YInput from "./YInput.vue";

export default {
  components: { YInput, YButton },
  name: "Filterbar",
  props: {
    modelValue: {
      required: true,
    },
    filters: {
      require: true,
    },
  },
  setup(props, { emit }) {
      const filterItems = () => {
          emit('update:modelValue', props.modelValue)
          emit('filter')
      }
      return {
          styles,
          filterItems
      }
  },
};
</script>
