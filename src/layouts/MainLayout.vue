<template>
  <q-layout >
    <q-header class="bg-midnight" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-white" >
          Veterinaria Patito Feo
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :breakpoint="700"
      content-class="bg-midnight"
    >
      <q-list v-for="(item, index) in actions" :key="index">
        <q-item
          clickable
          v-ripple
          :to="item.path"
          active-class="bg-cadet"
          @click="left=false"
        >
          <q-item-section avatar>
            <q-icon class="electric" :name="item.icon" />
          </q-item-section>
          <q-item-section class="text-electric" >
            <q-item-label >{{ item.title }}</q-item-label>
            <q-item-label class="text-cadet" caption>{{
              item.description
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      actions: [
        {
          title: "Home",
          description: "Home page",
          icon: "home",
          path: "/app/home"
        },
        {
          title: "Employees",
          description: "View list of all current employees",
          icon: "people",
          path: ""
        },
        {
          title: "Owners",
          description: "View list of all current owners",
          icon: "face",
          path: ""
        },
        {
          title: "Pets",
          description: "View list of all current pets",
          icon: "pets",
          path: ""
        },
        {
          title: "Appointments",
          description: "View appointment history",
          icon: "healing",
          path: ""
        }
      ]
    }
  }
}
</script>
