<template>
  <div class="uploadVouvher">
    <navmenu />
    <steps :record-id="recordID" />
  </div>
</template>

<script>
// @ is an alias to /src
import navmenu from '@/components/staff/navmenu.vue'
import steps from '@/components/staff/uploadVoucher/steps.vue'

export default {
  name: 'staffuploadVouvher',
  components: {
    navmenu,steps
  },
  data() {
    return { recordID: this.$route.params.recordID || null }
  }
}
</script>


