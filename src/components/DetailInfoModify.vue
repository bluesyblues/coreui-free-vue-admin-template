<template>
  <CModalHeader>
    <CModalTitle>Modify detail info</CModalTitle>
  </CModalHeader>
  <CModalBody>
    Privacy policy select
    <CFormSelect
      v-model="privacyPolicyAgreementSelect"
      aria-label="privacyPolicyAgreementSelect"
      :options="[
        'Select',
        { label: '0', value: '0' },
        { label: '1', value: '1' },
      ]"
    >
    </CFormSelect>
    Marketing Agreement Select
    <CFormSelect
      v-model="marketingAgreementSelect"
      aria-label="marketingAgreementSelect"
      :options="[
        'Select',
        { label: '0', value: '0' },
        { label: '1', value: '1' },
      ]"
    >
    </CFormSelect>
    First name
    <CFormInput
      v-model="firstNameInput"
      :placeholder="isEmpty(userInfo.detail_data.first_name)"
      aria-label="firstNameInput"
    />
    Last name
    <CFormInput
      v-model="lastNameInput"
      :placeholder="isEmpty(userInfo.detail_data.last_name)"
      aria-label="lastNameInput"
    />
    Company name
    <CFormInput
      v-model="companyInput"
      :placeholder="isEmpty(userInfo.detail_data.company)"
      aria-label="companyInput"
    />
  </CModalBody>
  <CModalFooter>
    <CButton
      color="secondary"
      @click="
        () => {
          detailInfoOpen = false
        }
      "
    >
      Close
    </CButton>
    <CButton
      color="primary"
      @click="
        () => {
          detailInfoOpen = false
          detailInfoChange(userInfo.user_id)
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
  props: ['userInfo'],
  data() {
    return {
      privacyPolicyAgreementSelect: null,
      marketingAgreementSelect: null,
      firstNameInput: null,
      lastNameInput: null,
      companyInput: null,
      detailInfoOpen: true,
    }
  },
  methods: {
    isNA(value) {
      if (value === 'N/A') {
        return null
      } else {
        return value
      }
    },
    async detailInfoChange(userId) {
      await this.axiosInstance({
        method: 'post',
        url: this.url + '/update_detail_info_admin',
        data: {
          user_id: userId,
          detail_data: {
            privacy_policy_agreement: this.privacyPolicyAgreementSelect,
            marketing_agreement: this.marketingAgreementSelect,
            first_name: this.isNA(this.firstNameInput),
            last_name: this.isNA(this.lastNameInput),
            company: this.isNA(this.companyInput),
          },
          admin_tokens: {
            access_token: sessionStorage.getItem('access_token'),
          },
        },
      })
      alert('Change saved')
      this.emitter.emit('refresh')
    },
    isEmpty(value) {
      if (value == null || value.length === 0) {
        return 'N/A'
      } else {
        return value
      }
    },
  },
  watch: {
    detailInfoOpen: function () {
      if (this.detailInfoOpen === false) {
        this.$emit('close-modal')
      }
    },
  },
}
</script>
