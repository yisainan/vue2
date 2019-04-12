<template>
  <div class="page-indexlist">
    <gheader :examplename="examplename"></gheader>
    <div class="page-indexlist-wrapper">
      <mt-index-list>
        <mt-index-section v-for="(item,index) in alphabet" 
          :key="index" :index="item.initial" :id="'status'+index">
          <mt-cell v-for="(cell,index) in item.cells"   
            :key="index" :title="cell"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
   const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];
export default {
  name: 'IndexList',
  data () {
    return {
      examplename: 'IndexList',
      alphabet: []
    }
  },
  created() {
    'ABCDEFGHIGKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
      let cells = NAMES.filter(name => name[0] == initial);
      this.alphabet.push({
        initial,
        cells
      });
    })
  },
  methods: {

  }
}
</script>
