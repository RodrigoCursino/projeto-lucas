<template>
  <div class="page">
      <section class="sidebar-layout">
          <SideBar/>
          <div class="p-1 container-page">
            <MenuPrincipal/>
            <div class="content-page">
              <router-view></router-view>
            </div>
          </div>
      </section>
  </div>
</template>

<script>
import {customIconConfig}  from "@/mixins/Icons.js"
import SideBar             from "@/components/shared/SideBar"
import MenuPrincipal       from "@/components/shared/MenuPrincipal"
export default {
  name: 'app',
  mixins: {customIconConfig},
  components: {
    SideBar,
    MenuPrincipal
  },
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}

.page {

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: rgb(250, 250, 250);

  .container-page {
    width: 100%;
    margin-left: .5em;

    .content-page {
        margin-top: 1em;
        padding: 1em;
    }
  }

  .sidebar-layout {
      display: flex;
      flex-direction: row;
      min-height: 100%;
      height: 100vh;
  }

}
@media screen and (max-width: 1023px) {
  .b-sidebar {
      .sidebar-content {
          &.is-mini-mobile {
              width: 47px;
              &:not(.is-mini-expand),
              &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                  .menu-list {
                      li {
                          a {
                              span:nth-child(2) {
                                  display: none;
                              }
                          }
                          ul {
                              padding-left: 0;
                              li {
                                  a {
                                      display: inline-block;
                                  }
                              }
                          }
                      }
                  }
                  .menu-label:not(:last-child) {
                      margin-bottom: 0;
                  }
              }
          }
      }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
      .sidebar-content {
          &.is-mini {
              &:not(.is-mini-expand),
              &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                  width: 47px;
                  .menu-list {
                      li {
                          a {
                              span:nth-child(2) {
                                  display: none;
                              }
                          }
                          ul {
                              padding-left: 0;
                              li {
                                  a {
                                      display: inline-block;
                                  }
                              }
                          }
                      }
                  }
                  .menu-label:not(:last-child) {
                      margin-bottom: 0;
                  }
              }
          }
      }
  }
}
.is-mini-expand {
  .menu-list a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
}
</style>