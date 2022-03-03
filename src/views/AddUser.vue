<template>
  <div class="bg-light d-flex flex-row align-items-center">
    <CContainer>
      <CCard>
        <CRow class="justify-content-center">
          <CCol :md="6">
            <CCard class="p-4">
              <h5>Required</h5>
              Username
              <CFormInput v-model="usernameInput" aria-label="usernameInput" />
              Email
              <CFormInput v-model="emailInput" aria-label="emailInput" />
              Password
              <CFormInput
                v-model="passwordInput"
                type="password"
                aria-label="passwordInput"
              />
              Password validation
              <CFormInput
                v-model="passwordValidationInput"
                type="password"
                aria-label="passwordValidationInput"
              />
              Active
              <CFormSelect
                v-model="isActiveSelect"
                aria-label="isActiveSelect"
                :options="[
                  { label: 'Select', value: null },
                  { label: '0', value: '0' },
                  { label: '1', value: '1' },
                ]"
              >
              </CFormSelect>
              Privacy policy select
              <CFormSelect
                v-model="privacyPolicyAgreementSelect"
                aria-label="privacyPolicyAgreementSelect"
                :options="[
                  { label: 'Select', value: null },
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
                  { label: 'Select', value: null },
                  { label: '0', value: '0' },
                  { label: '1', value: '1' },
                ]"
              >
              </CFormSelect>
            </CCard>
          </CCol>
          <CCol :md="6">
            <CCard class="p-4">
              <h5>Optional</h5>
              First name
              <CFormInput
                v-model="firstNameInput"
                aria-label="firstNameInput"
              />
              Last name
              <CFormInput v-model="lastNameInput" aria-label="lastNameInput" />
              Company name
              <CFormInput v-model="companyInput" aria-label="companyInput" />
              Compression Toolket Authority
              <CFormSelect
                v-model="compressionToolkitAuthoritySelect"
                aria-label="compressionToolkitAuthoritySelect"
                :options="[
                  { label: 'Select', value: null },
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
                  { label: 'Select', value: null },
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
                  { label: 'Select', value: null },
                  { label: '0', value: '0' },
                  { label: '1', value: '1' },
                  { label: '2', value: '2' },
                  { label: '3', value: '3' },
                  { label: '4', value: '4' },
                ]"
              >
              </CFormSelect>
              Admin
              <CFormSelect
                v-model="isAdminSelect"
                aria-label="isAdminSelect"
                :options="[
                  { label: 'Select', value: null },
                  { label: '0', value: '0' },
                  { label: '1', value: '1' },
                ]"
              >
              </CFormSelect>
            </CCard>
          </CCol>
        </CRow>
      </CCard>
      <CRow class="justify-content-center">
        <CButton
          align="right"
          color="primary"
          class="btn btn-primary gap-2 col-5"
          :disabled="
            usernameInput.length < 1 ||
            emailInput.length < 1 ||
            passwordInput.length < 1 ||
            passwordInput !== passwordValidationInput ||
            privacyPolicyAgreementSelect === null ||
            marketingAgreementSelect === null
          "
          @click="addUser"
        >
          Add
        </CButton>
      </CRow>
    </CContainer>
  </div>
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
  watch: {
    compressionToolkitAuthoritySelect: function () {
      console.log(this.compressionToolkitAuthoritySelect)
    },
  },
}
</script>
