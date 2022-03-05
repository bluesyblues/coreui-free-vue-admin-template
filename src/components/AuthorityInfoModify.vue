<template>
  <CModalHeader>
    <CModalTitle>Modify authority info</CModalTitle>
  </CModalHeader>
  <CModalBody>
    Compression Toolkit Authority
    <CFormSelect
      v-model="compressionToolkitAuthoritySelect"
      aria-label="compressionToolkitAuthoritySelect"
      :options="[
        'Select',
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ]"
    >
    </CFormSelect>
    Model Search Authority
    <CFormSelect
      v-model="modelSearchAuthoritySelect"
      aria-label="modelSearchAuthoritySelect"
      :options="[
        'Select',
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ]"
    >
    </CFormSelect>
    Device Farm Authority
    <CFormSelect
      v-model="deviceFarmAuthoritySelect"
      aria-label="deviceFarmAuthoritySelect"
      :options="[
        'Select',
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ]"
    >
    </CFormSelect>
  </CModalBody>
  <CModalFooter>
    <CButton
      color="secondary"
      @click="
        () => {
          authorityInfoOpen = false
        }
      "
    >
      Close
    </CButton>
    <CButton
      color="primary"
      @click="
        () => {
          authorityInfoChange(userId)
          authorityInfoOpen = false
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
      compressionToolkitAuthoritySelect: null,
      modelSearchAuthoritySelect: null,
      deviceFarmAuthoritySelect: null,
      authorityInfoOpen: true,
    }
  },
  methods: {
    async authorityInfoChange(userId) {
      await this.axiosInstance({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/update_authority_info',
        data: {
          user_id: userId,
          authorities: {
            compression_toolkit_authority:
              this.compressionToolkitAuthoritySelect,
            model_search_authority: this.modelSearchAuthoritySelect,
            device_farm_authority: this.deviceFarmAuthoritySelect,
          },
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
    authorityInfoOpen: function () {
      if (this.authorityInfoOpen === false) {
        this.$emit('close-modal')
      }
    },
  },
}
</script>
