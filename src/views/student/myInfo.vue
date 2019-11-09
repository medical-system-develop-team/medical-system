<template>
  <div class="myInfo">
    <navmenu />
    <h1>This is an myInfo page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/student/navmenu.vue'

export default {
  name: 'myInfo',
  components: {
    navmenu
  }
}
</script>student/
