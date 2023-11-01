<template>
  <div>
    Main_Class
    {{ Type }}
    {{ Lang }}
    {{ Class }}
  </div>
</template>

<script>
export default {
  name: "Main_Class",

  computed: {
    Type() {
      return this.$store.state.type;
    },
    Lang() {
      return this.$store.state.lang;
    },
    Class() {
      return this.$store.state.class;
    },
  },
};
</script>
