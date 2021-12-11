<template>
  <div>
    <input :type="inputType" v-model="inputValue" :placeholder="placeholder"/>
  </div>
</template>

<script>
import { computed } from "vue";
import styles from '@styles'

export default {
  name: "YInput",
  props: {
    inputType: {
      type: String,
      required: false,
      default: "text",
    },
    modelValue: {
      require: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {
      inputValue,
      styles
    };
  },
};
</script>