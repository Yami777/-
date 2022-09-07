<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- {{ $store.state.count }}
    <button @click="increment">点击</button>
    {{ $store.getters.bigNum }}
    <br /> -->
    {{ count }}
    {{ bigNum }}
    <button @click="SET_COUNT(10)">点击</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
// console.log(mapState)
export default {
  methods: {
    increment() {
      this.$store.commit('SET_COUNT', 10)
    },
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
