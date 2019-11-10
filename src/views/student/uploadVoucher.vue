<template>
  <div class="uploadVouvher">
    <navmenu />
    <steps />
    
  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/student/navmenu.vue'
import steps from '@/components/student/uploadVoucher/steps.vue'

export default {
  name: 'uploadVouvher',
  components: {
    navmenu,steps
  }
}
</script>
