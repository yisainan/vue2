<template>
  <div class="page-search">
    <!-- <gheader :examplename="examplename" :headerIsShow="false"></gheader> -->
    <mt-search autofocus v-model="value"
      :result="filterResult">
      <mt-cell
        v-for="(item,i) in filterResult"
        :key="i"
        :title="item"
        @click.native="searchItem(i)">
        <!-- :value="item.title" -->
      </mt-cell>
    </mt-search>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      examplename: 'Search',
      value: '',
      defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian',
        'Lemon',
        'Peach',
        'Cherry',
        'Berry',
        'Core',
        'Fig',
        'Haw',
        'Melon',
        'Plum',
        'Pear',
        'Peanut',
        'Other'
      ]
    }
  },
  computed: {
    filterResult() {
      // let R = this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
    }
  },
  methods: {
    searchItem(i) {
      this.value = this.filterResult[i];
    }
  }
}
</script>
