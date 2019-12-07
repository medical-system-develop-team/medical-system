<template>
  <div class="uploadVouvher">
    <navmenu />
    <steps :record-id="recordID" />
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
  },
  data() {
    return { recordID: this.$route.params.recordID || null }
  }
}
</script>


