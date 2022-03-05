<template>
  <CModalHeader>
    <CModalTitle>Modify is_active</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CFormSelect
      v-model="isActiveSelect"
      aria-label="isActiveSelect"
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
          isActiveOpen = false
        }
      "
    >
      Close
    </CButton>
    <CButton
      color="primary"
      @click="
        () => {
          isActiveChange(userId)
          isActiveOpen = false
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
      isActiveOpen: true,
      isActiveSelect: '',
    }
  },
  methods: {
    async isActiveChange(userId) {
      console.log(userId)
      await this.axiosInstance({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/activation_admin',
        data: {
          user_id: userId,
          activation: this.isActiveSelect,
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
    isActiveOpen: function () {
      if (this.isActiveOpen === false) {
        this.$emit('close-modal')
      }
    },
  },
}
</script>
