<template>
  Username
  <CFormInput
    v-model="usernameInput"
    aria-label="usernameInput"
    style="width: 300px"
  />
  Email
  <CFormInput
    v-model="emailInput"
    aria-label="emailInput"
    style="width: 300px"
  />
  Password
  <CFormInput
    v-model="passwordInput"
    type="password"
    aria-label="passwordInput"
    style="width: 300px"
  />
  Password validation
  <CFormInput
    v-model="passwordValidationInput"
    type="password"
    aria-label="passwordValidationInput"
    style="width: 300px"
  />
  Privacy policy select
  <CFormSelect
    v-model="privacyPolicyAgreementSelect"
    aria-label="privacyPolicyAgreementSelect"
    style="width: 300px"
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
    style="width: 300px"
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
    aria-label="firstNameInput"
    style="width: 300px"
  />
  Last name
  <CFormInput
    v-model="lastNameInput"
    aria-label="lastNameInput"
    style="width: 300px"
  />
  Company name
  <CFormInput
    v-model="companyInput"
    aria-label="companyInput"
    style="width: 300px"
  />
  Compression Toolket Authority
  <CFormSelect
    v-model="compressionToolkitAuthoritySelect"
    aria-label="compressionToolkitAuthoritySelect"
    style="width: 300px"
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
    style="width: 300px"
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
    style="width: 300px"
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
  Active
  <CFormSelect
    v-model="isActiveSelect"
    aria-label="isActiveSelect"
    style="width: 300px"
    :options="[
      'Select',
      { label: '0', value: '0' },
      { label: '1', value: '1' },
    ]"
  >
  </CFormSelect>
  Admin
  <CFormSelect
    v-model="isAdminSelect"
    aria-label="isAdminSelect"
    style="width: 300px"
    :options="[
      'Select',
      { label: '0', value: '0' },
      { label: '1', value: '1' },
    ]"
  >
  </CFormSelect>
  <CButton
    align="right"
    color="primary"
    :disabled="
      usernameInput.length < 1 ||
      emailInput.length < 1 ||
      passwordInput.length < 1 ||
      passwordInput !== passwordValidationInput
    "
    @click="addUser"
  >
    Add
  </CButton>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      usernameInput: '',
      emailInput: '',
      passwordInput: '',
      passwordValidationInput: '',
      privacyPolicyAgreementSelect: null,
      marketingAgreementSelect: null,
      firstNameInput: null,
      lastNameInput: null,
      companyInput: null,
      compressionToolkitAuthoritySelect: null,
      modelSearchAuthoritySelect: null,
      deviceFarmAuthoritySelect: null,
      isActiveSelect: null,
      isAdminSelect: null,
      userId: null,
    }
  },
  methods: {
    addUser() {
      if (this.passwordInput !== this.passwordValidationInput) {
        alert('password not valid')
      } else {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8888/api/v1/signup',
          data: {
            username: this.usernameInput,
            password: this.passwordInput,
            email: this.emailInput,
            detail_data: {
              privacy_policy_agreement: this.privacyPolicyAgreementSelect,
              marketing_agreement: this.marketingAgreementSelect,
              first_name: this.firstNameInput,
              last_name: this.lastNameInput,
              company: this.companyInput,
            },
          },
        }).then((response) => {
          this.userId = response.data.user_id
          if (this.isActiveSelect !== null && this.userId !== null) {
            axios({
              method: 'post',
              url: 'http://127.0.0.1:8888/api/v1/activation_admin',
              data: {
                user_id: this.userId,
                activation: this.isActiveSelect,
                admin_tokens: {
                  access_token: localStorage.getItem('access_token'),
                },
              },
            })
          }
          if (this.isAdminSelect !== null && this.userId !== null) {
            axios({
              method: 'post',
              url: 'http://127.0.0.1:8888/api/v1/update_admin',
              data: {
                user_id: this.userId,
                is_admin: this.isAdminSelect,
                admin_tokens: {
                  access_token: localStorage.getItem('access_token'),
                },
              },
            })
          }
          if (this.userId !== null) {
            axios({
              method: 'post',
              url: 'http://127.0.0.1:8888/api/v1/update_authority_info',
              data: {
                user_id: this.userId,
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
          }
          alert(this.username + ' (' + this.userId + ') added')
          this.$router.go()
        })
      }
    },
  },
}
</script>
