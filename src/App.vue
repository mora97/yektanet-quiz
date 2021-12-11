<template>
  <div :class="[styles.pX10]">
    <div :class="[styles.flexRowStart, styles.mT10]">
      <YInput
        v-for="filter in filters"
        :key="filter"
        v-model="filtersValue[filter.key]"
        :placeholder="filter.title"
        :class="[styles.mX5, styles.mB10]"
      />
      <YButton @click="sortFields" title="مرتب سازی فیلدها" />
    </div>
    <div :class="[styles.mT30, styles.mB10]">
      <HistoryList :histories="histories" />
    </div>
  </div>
</template>

<script>
import YInput from "@uikit/YInput";
import YButton from "@uikit/YButton";
import { onMounted, ref, watch } from "vue";
import mockData from "@/static-data/data.json";
import HistoryList from "./components/page/HistoryList.vue";
import styles from "@styles";

export default {
  name: "App",
  components: {
    YInput,
    HistoryList,
    YButton,
  },
  setup() {
    const tree = {};
    const filters = ref([
      {
        key: "name",
        title: "نام تغییر دهنده",
      },
      {
        key: "date",
        title: "تاریخ تغییر",
      },
      {
        key: "title",
        title: "نام آگهی",
      },
      {
        key: "field",
        title: "فیلد",
      },
    ]);
    const filtersValue = ref({
      name: "",
      date: "",
      title: "",
      field: "",
    });
    const histories = ref(mockData);
    const url = new URL(window.location.href);
    let sortFieldsAscending = false;

    watch(
      () => filtersValue.value.name,
      (value) => {
        searchQuery("name", value.toLowerCase());
      }
    );

    watch( () => filtersValue.value.title,
      (value) => {
        searchQuery("title", value.toLowerCase());
      }
    );

    watch(
      () => filtersValue.value.field,
      (value) => {
        searchQuery("field", value.toLowerCase());
      }
    );

    watch(
      () => filtersValue.value.date,
      (value) => {
        if (value.length > 8) {
          searchDate(value);
        } else {
          histories.value = mockData;
        }
      }
    );

    const searchDate = (date) => {
      const time = convertDateToTime(date);
      histories.value = tree[time] ? tree[time].items : [];
      setUrlQuery("date", date);
    };

    const searchQuery = (searchedKey, searchedText) => {
      histories.value = mockData.filter((hisotry) => {
        const key = hisotry[searchedKey].toLowerCase();
        return key.includes(searchedText, 0);
      });
      setUrlQuery(searchedKey, searchedText);
    };

    const setUrlQuery = (key, value) => {
      const query = url.searchParams;
      
      if (query.get(key) !== null) {
        query.set(key, value);
      } else {
        query.append(key, value);
      }
      window.history.pushState(
        { title: key, url: value },
        key,
        `?${query.toString()}`
      );
    };

    const convertDateToTime = (date) => {
      const seperateDate = date.split("-");
      return new Date(
        seperateDate[0],
        seperateDate[1],
        seperateDate[2]
      ).getTime();
    };

    const insertBSTNode = (time, item, nodeIndex) => {
      if (nodeIndex < time) {
        if (tree[nodeIndex].rightChild) {
          insertBSTNode(time, item, tree[nodeIndex].rightChild);
        } else {
          tree[nodeIndex].rightChild = time;
          tree[time] = {
            items: [item],
            rightChild: null,
            leftChild: null,
          };
        }
      } else if (nodeIndex > time) {
        if (tree[nodeIndex].leftChild) {
          insertBSTNode(time, item, tree[nodeIndex].leftChild);
        } else {
          tree[nodeIndex].leftChild = time;
          tree[time] = {
            items: [item],
            rightChild: null,
            leftChild: null,
          };
        }
      } else if (nodeIndex === time) {
        tree[nodeIndex].items.push(item);
      }
    };

    const sortFields = () => {
      sortFieldsAscending = !sortFieldsAscending;
      histories.value.sort((firstItem, secondItem) => {
        const firstField = firstItem.field.toLowerCase();
        const secondField = secondItem.field.toLowerCase();

        if (firstField > secondField) {
          return sortFieldsAscending ? -1 : 1;
        }

        return sortFieldsAscending ? 1 : -1;
      });
    };

    const initFilters = () => {
      const query = url.searchParams;
      filters.value.forEach((filter) => {
        if (query.get(filter.key)) {
          filtersValue.value[filter.key] = query.get(filter.key);
        }
      });
    };

    onMounted(() => {
      initFilters();
      mockData.forEach((data, index) => {
        const time = convertDateToTime(data.date);
        if (index === 0) {
          tree[time] = {
            items: [data],
            rightChild: null,
            leftChild: null,
          };
        } else {
          insertBSTNode(time, data, convertDateToTime(mockData[0].date));
        }
      });
    });

    return {
      filters,
      filtersValue,
      styles,
      histories,
      searchDate,
      sortFields,
    };
  },
};
</script>
