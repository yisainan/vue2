<template>
  <aside class="application-sidebar">
    <div class="sidebar-container" :class="{'show-sidebar':navStatus}">
      <nav>
        <ul class="sidebar-list">
          <li class="sidenav"
            v-for="category in categories"
            @click="hideSidebar"
            :key="category.shortName">
            <router-link :to="{ name: 'category', params: { type: category.shortName }}">
              <span class="title">{{category.cate1Name}}</span>
              <span class="right">
                <svg-icon icon-class="right"></svg-icon>
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="sidebar-overlay"
      v-show="navStatus"
      @click="hideSidebar"></div>
  </aside>
</template>
<script>
export default {
  props: {
    navStatus: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hideSidebar() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
.application-sidebar {
  .sidebar-container {
    position: fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    height: 100%;
    overflow: auto;
    width: 7.733rem;
    left: -7.733rem;
    z-index: 500;
    top: 0;
    bottom: 0;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    &.show-sidebar {
      -webkit-transform: translateX(7.733rem);
      transform: translateX(7.733rem);
    }
    .sidebar-list {
      width: 100%;
      height: 100%;
      .sidenav {
        a {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    nav {
      border-top: 1px solid #222;
      box-shadow: 0 1px 1px #363636 inset;
      background: #282828;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0.2rem;
      li {
        overflow: hidden;
        line-height: 50px;
        padding: 0 15px 0 10px;
        a {
          color: #9a9a9a;
          font-size: 16px;
        }
      }
    }
  }
  .right {
    float: right;
    color: #666;
    font-size: 15px;
  }
  .sidebar-overlay {
    position: fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
