<template>
    <button>{{ title }}</button>
</template>

<script>
export default {
    name: 'YBUtton',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>