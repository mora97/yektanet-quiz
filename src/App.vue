<template>
  <div :class="[styles.pX20]">
    <div :class="[styles.mT10]">
      <Filterbar
        :filters="filters"
        @filter="filterItems"
        v-model="filtersValue"
      />
      <YButton @click="sortFields" title="مرتب سازی فیلدها" :class="[styles.mX5, styles.width70, styles.mY5]" />
    </div>
    <div :class="[styles.mT20, styles.mB10]">
      <HistoryList :histories="histories" @load-more-emit="loadMoreHistories" />
    </div>
  </div>
</template>

<script>
import YInput from "@uikit/YInput";
import YButton from "@uikit/YButton";
import { onMounted, ref } from "vue";
import mockData from "@/static-data/data.json";
import HistoryList from "./components/page/HistoryList.vue";
import styles from "@styles";
import Filterbar from "./components/ui-kit/Filterbar.vue";
import { createBST, convertDateToTime } from "./utils";

export default {
  name: "App",
  components: {
    YInput,
    HistoryList,
    YButton,
    Filterbar,
  },
  setup() {
    let bst = {};
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
    const histories = ref();
    const url = new URL(window.location.href);
    let sortFieldsAscending = false;

    const filterItems = () => {
      let historiesItem = mockData;
      Object.keys(filtersValue.value).forEach((filterKey) => {
        setUrlQuery(filterKey, filtersValue.value[filterKey]);
      });

      if (filtersValue.value.date.length) {
        historiesItem = filterBaseOnDate(filtersValue.value.date);
      }

      histories.value = historiesItem.filter((history) => {
        return (
          history.name
            .toLowerCase()
            .includes(filtersValue.value.name.toLowerCase()) &&
          history.field
            .toLowerCase()
            .includes(filtersValue.value.field.toLowerCase()) &&
          history.title
            .toLowerCase()
            .includes(filtersValue.value.title.toLowerCase())
        );
      });
    };

    const filterBaseOnDate = (date) => {
      const time = convertDateToTime(date);
      return bst[time] ? bst[time].items : [];
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
      filterItems()
    };

    const loadMoreHistories = () => {
      if (histories.value.length > 500) {
        const startIndex = histories.value.length;
        if (startIndex !== mockData.length) {
          histories.value = histories.value.concat(
            mockData.slice(startIndex, startIndex + 500)
          );
        }
      }
    };

    onMounted(async () => {
      histories.value = mockData.slice(0, 100);
      bst = await createBST(mockData);
      initFilters();
      
    });

    return {
      filters,
      filtersValue,
      styles,
      histories,
      sortFields,
      loadMoreHistories,
      filterItems,
    };
  },
};
</script>
