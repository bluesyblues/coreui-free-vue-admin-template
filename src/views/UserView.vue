<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-3 mt-0">
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>
                  <CFormSelect
                    v-model="searchKey"
                    aria-label="searchKey"
                    :options="[
                      'Search key',
                      { label: 'user_id', value: 'user_id' },
                      { label: 'username', value: 'username' },
                      { label: 'email', value: 'email' },
                    ]"
                  >
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    v-model="searchMethod"
                    aria-label="searchMethod"
                    :options="[
                      'Search method',
                      { label: 'exact match', value: 'match' },
                      { label: 'like', value: 'like' },
                    ]"
                  >
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell>
                  <CInputGroup class="mb-3">
                    <CFormInput
                      v-model="keyword"
                      placeholder="keyword"
                      aria-label="keyword"
                      aria-describedby="button-addon2"
                    />
                    <CButton
                      type="button"
                      color="secondary"
                      variant="outline"
                      id="button-addon2"
                      @click="getData"
                      >Query
                    </CButton>
                  </CInputGroup>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CCard class="mb-2">
        <CCardBody>
          <h5>Items : {{ userInfo.length }}</h5>
          <CAccordion flush>
            <CAccordionItem :key="i" v-for="(d, i) in currentPageUserInfo">
              <CAccordionHeader v-if="selectedSearchKey === 'username'">
                {{ d.username }} ({{ d.user_id.slice(0, 8) }})
              </CAccordionHeader>
              <CAccordionHeader v-else-if="selectedSearchKey === 'email'">
                {{ d.email }} ({{ d.user_id.slice(0, 8) }})
              </CAccordionHeader>
              <CAccordionHeader v-else-if="selectedSearchKey === 'user_id'">
                {{ d.user_id }}
              </CAccordionHeader>
              <CAccordionBody>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell>user_id</CTableDataCell>
                      <CTableDataCell>{{ d.user_id }}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                General Info
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell color="dark">username</CTableDataCell>
                      <CTableDataCell>{{ d.username }}</CTableDataCell>
                      <CTableDataCell color="dark">email</CTableDataCell>
                      <CTableDataCell>{{ d.email }}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell color="dark">created_time</CTableDataCell>
                      <CTableDataCell>{{ d.created_time }}</CTableDataCell>
                      <CTableDataCell color="dark">
                        last_login_time
                      </CTableDataCell>
                      <CTableDataCell>{{ d.last_login_time }}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell color="dark">is_active</CTableDataCell>
                      <CTableDataCell>
                        {{ d.is_active }}
                        <CButton
                          align="right"
                          color="primary"
                          @click="
                            () => {
                              isActiveOpen = true
                            }
                          "
                        >
                          Modify
                        </CButton>
                        <CModal
                          :visible="isActiveOpen"
                          @close="
                            () => {
                              isActiveOpen = false
                            }
                          "
                        >
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
                              @click="isActiveChange(d.user_id)"
                            >
                              Save changes
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell>
                      <CTableDataCell color="dark">is_admin</CTableDataCell>
                      <CTableDataCell>
                        {{ d.is_admin }}
                        <CButton
                          align="right"
                          color="primary"
                          @click="
                            () => {
                              isAdminOpen = true
                            }
                          "
                        >
                          Modify
                        </CButton>
                        <CModal
                          :visible="isAdminOpen"
                          @close="
                            () => {
                              isAdminOpen = false
                            }
                          "
                        >
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
                              @click="isAdminChange(d.user_id)"
                            >
                              Save changes
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                Detail Info
                <CButton
                  align="right"
                  color="primary"
                  @click="
                    () => {
                      detailInfoOpen = true
                    }
                  "
                >
                  Modify
                </CButton>
                <CModal
                  :visible="detailInfoOpen"
                  @close="
                    () => {
                      detailInfoOpen = false
                    }
                  "
                >
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
                      :placeholder="isEmpty(d.detail_data.first_name)"
                      aria-label="firstNameInput"
                    />
                    Last name
                    <CFormInput
                      v-model="lastNameInput"
                      :placeholder="isEmpty(d.detail_data.last_name)"
                      aria-label="lastNameInput"
                    />
                    Company name
                    <CFormInput
                      v-model="companyInput"
                      :placeholder="isEmpty(d.detail_data.company)"
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
                      @click="detailInfoChange(d.user_id)"
                    >
                      Save changes
                    </CButton>
                  </CModalFooter>
                </CModal>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell color="dark">
                        privacy_policy_agreement
                      </CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.detail_data.privacy_policy_agreement) }}
                      </CTableDataCell>
                      <CTableDataCell color="dark">
                        marketing_agreement
                      </CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.detail_data.marketing_agreement) }}
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell color="dark">first_name</CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.detail_data.first_name) }}
                      </CTableDataCell>
                      <CTableDataCell color="dark">last_name</CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.detail_data.last_name) }}
                      </CTableDataCell>
                      <CTableDataCell color="dark">company</CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.detail_data.company) }}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                Authority info
                <CButton
                  align="right"
                  color="primary"
                  @click="
                    () => {
                      authorityInfoOpen = true
                    }
                  "
                >
                  Modify
                </CButton>
                <CModal
                  :visible="authorityInfoOpen"
                  @close="
                    () => {
                      authorityInfoOpen = false
                    }
                  "
                >
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
                      @click="authorityInfoChange(d.user_id)"
                    >
                      Save changes
                    </CButton>
                  </CModalFooter>
                </CModal>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell color="dark">
                        compression_toolkit_authority
                      </CTableDataCell>
                      <CTableDataCell>{{ d.authorities[0] }}</CTableDataCell>
                      <CTableDataCell color="dark">
                        model_search_authority
                      </CTableDataCell>
                      <CTableDataCell>{{ d.authorities[1] }}</CTableDataCell>
                      <CTableDataCell color="dark">
                        device_farm_authority
                      </CTableDataCell>
                      <CTableDataCell>{{ d.authorities[2] }}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem @click="pagePrevious">Previous</CPaginationItem>
        <CPaginationItem @click="pageNext">Next</CPaginationItem>
      </CPagination>
    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'

const pagination = 5
export default {
  name: 'User',
  data() {
    return {
      searchKey: '',
      searchMethod: '',
      keyword: '',
      selectedSearchKey: '',
      selectedSearchMethod: '',
      userInfo: [],
      currentPage: 0,
      currentPageUserInfo: [],
      currentPageFirst: 0,
      isActiveOpen: false,
      isActiveSelect: null,
      isAdminOpen: false,
      isAdminSelect: null,
      detailInfoOpen: false,
      privacyPolicyAgreementSelect: null,
      marketingAgreementSelect: null,
      firstNameInput: null,
      lastNameInput: null,
      companyInput: null,
      authorityInfoOpen: false,
      compressionToolkitAuthoritySelect: null,
      modelSearchAuthoritySelect: null,
      deviceFarmAuthoritySelect: null,
    }
  },
  methods: {
    getData() {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/query_users',
        data: {
          keytype: this.searchKey,
          method: this.searchMethod,
          keyword: this.keyword,
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      }).then((response) => {
        this.userInfo = response.data
        this.currentPageFirst = this.currentPage * pagination
        this.currentPageUserInfo = this.userInfo.slice(
          this.currentPageFirst,
          this.currentPageFirst + pagination,
        )
        this.selectedSearchKey = this.searchKey
        this.selectedSearchMethod = this.searchMethod
      })
    },
    pagePrevious() {
      if (this.currentPage > 0) {
        this.currentPage -= 1
      }
    },
    pageNext() {
      if (this.currentPage < this.userInfo.length / pagination - 1) {
        this.currentPage += 1
      }
    },
    isEmpty(value) {
      if (value == null || value.length === 0) {
        return 'N/A'
      } else {
        return value
      }
    },
    isNA(value) {
      if (value === 'N/A') {
        return null
      } else {
        return value
      }
    },
    isAdminChange(user_id) {
      this.isAdminOpen = false
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/update_admin',
        data: {
          user_id: user_id,
          is_admin: this.isAdminSelect,
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      })
    },
    isActiveChange(user_id) {
      this.isActiveOpen = false
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/activation_admin',
        data: {
          user_id: user_id,
          activation: this.isActiveSelect,
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      })
    },
    detailInfoChange(user_id) {
      this.detailInfoOpen = false
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/update_detail_info_admin',
        data: {
          user_id: user_id,
          detail_data: {
            privacy_policy_agreement: this.privacyPolicyAgreementSelect,
            marketing_agreement: this.marketingAgreementSelect,
            first_name: this.isNA(this.firstNameInput),
            last_name: this.isNA(this.lastNameInput),
            company: this.isNA(this.companyInput),
          },
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      })
    },
    authorityInfoChange(user_id) {
      this.authorityInfoOpen = false
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/update_authority_info',
        data: {
          user_id: user_id,
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
    },
  },
  watch: {
    currentPage: function () {
      this.currentPageFirst = this.currentPage * pagination
      this.currentPageUserInfo = this.userInfo.slice(
        this.currentPageFirst,
        this.currentPageFirst + pagination,
      )
    },
  },
  setup() {
    return {}
  },
}
</script>
