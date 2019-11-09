<template>
  <div class="about">
    <navmenu />
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/navmenu.vue'

export default {
  name: 'about',
  components: {
    navmenu
  }
}
</script>
