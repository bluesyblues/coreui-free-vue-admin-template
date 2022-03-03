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
import axios from 'axios'

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
    isAdminChange(userId) {
      console.log(userId)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/update_admin',
        data: {
          user_id: userId,
          is_admin: this.isAdminSelect,
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      })
      alert('Change saved')
    },
  },
  watch: {
    isAdminOpen: function () {
      if (this.isAdminOpen === false) {
        this.$emit('close-modal')
        this.emitter.emit('refresh')
      }
    },
  },
}
</script>
