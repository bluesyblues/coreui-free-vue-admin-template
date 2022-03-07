<template>
  <CModalHeader>
    <CModalTitle>Modify is_admin</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CFormSelect
      v-model="isAdminSelect"
      aria-label="isAdminSelect"
      :options="[
        'Select',
        { label: '0', value: '0' },
        { label: '1', value: '1' },
      ]"
    >
    </CFormSelect>
  </CModalBody>
  <CModalFooter>
    <CButton
      color="secondary"
      @click="
        () => {
          isAdminOpen = false
        }
      "
    >
      Close
    </CButton>
    <CButton
      color="primary"
      @click="
        () => {
          isAdminChange(userId)
          isAdminOpen = false
        }
      "
    >
      Save changes
    </CButton>
  </CModalFooter>
</template>
<script>
export default {
  emits: ['close-modal'],
  props: ['userId'],
  data() {
    return {
      isAdminOpen: true,
      isAdminSelect: '',
    }
  },
  methods: {
    async isAdminChange(userId) {
      console.log(userId)
      await this.axiosInstance({
        method: 'post',
        url: this.url + '/update_admin',
        data: {
          user_id: userId,
          is_admin: this.isAdminSelect,
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      })
      alert('Change saved')
      this.emitter.emit('refresh')
    },
  },
  watch: {
    isAdminOpen: function () {
      if (this.isAdminOpen === false) {
        this.$emit('close-modal')
      }
    },
  },
}
</script>
