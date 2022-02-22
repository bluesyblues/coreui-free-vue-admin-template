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
          Items : {{ userInfo.length }}
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
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell color="dark">username</CTableDataCell>
                      <CTableDataCell>{{ d.username }}</CTableDataCell>
                      <CTableDataCell color="dark">email</CTableDataCell>
                      <CTableDataCell>{{ d.email }}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell color="dark">is_active</CTableDataCell>
                      <CTableDataCell>{{ d.is_active }}</CTableDataCell>
                      <CTableDataCell color="dark">is_admin</CTableDataCell>
                      <CTableDataCell>{{ d.is_admin }}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell color="dark">
                        privacy_policy_agreement
                      </CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.privacy_policy_agreement) }}
                      </CTableDataCell>
                      <CTableDataCell color="dark">
                        marketing_agreement
                      </CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.marketing_agreement) }}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell color="dark">first_name</CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.first_name) }}
                      </CTableDataCell>
                      <CTableDataCell color="dark">last_name</CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.last_name) }}
                      </CTableDataCell>
                      <CTableDataCell color="dark">company</CTableDataCell>
                      <CTableDataCell>
                        {{ isEmpty(d.company) }}
                      </CTableDataCell>
                    </CTableRow>
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
                <CTable>
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell color="dark">created_time</CTableDataCell>
                      <CTableDataCell>{{ d.created_time }}</CTableDataCell>
                      <CTableDataCell color="dark">
                        last_login_time
                      </CTableDataCell>
                      <CTableDataCell>{{ d.last_login_time }}</CTableDataCell>
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
