<template>
  <CCard cclas="mb-3 mt-0">
    <CTable borderless>
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
                :disabled="
                  searchKey.length == 0 ||
                  searchMethod.length == 0 ||
                  keyword == 0
                "
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
  </CCard>
</template>
<script>
export default {
  name: 'Query',
  data() {
    return {
      searchKey: '',
      searchMethod: '',
      keyword: '',
      userList: [],
      queryResult: '',
    }
  },
  mounted() {
    this.emitter.on('refresh', this.getData)
  },
  methods: {
    async getData() {
      await this.axiosInstance({
        method: 'post',
        url: this.url + '/query_users',
        data: {
          keytype: this.searchKey,
          method: this.searchMethod,
          keyword: this.keyword,
          admin_tokens: {
            access_token: sessionStorage.getItem('access_token'),
          },
        },
      }).then((response) => {
        this.queryResult = {
          data: response.data,
          keytype: this.searchKey,
          keyword: this.keyword,
          method: this.searchMethod,
        }
      })
      this.emitter.emit('queryResult', this.queryResult)
      console.log('getdata')
    },
  },
}
</script>
