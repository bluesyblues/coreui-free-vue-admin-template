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
                      { label: 'user_id', value: '1' },
                      { label: 'username', value: '2' },
                      { label: 'email', value: '3' },
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
                      { label: 'exact match', value: '1' },
                      { label: 'like', value: '2' },
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
          <CAccordion flush>
            <CAccordionItem :key="i" v-for="(d, i) in items">
              <CAccordionHeader> {{ d.header }} </CAccordionHeader>
              <CAccordionBody>
                <strong>{{ d.body }}</strong>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem href="#">Previous</CPaginationItem>
        <CPaginationItem href="#">1</CPaginationItem>
        <CPaginationItem href="#">2</CPaginationItem>
        <CPaginationItem href="#">3</CPaginationItem>
        <CPaginationItem href="#">Next</CPaginationItem>
      </CPagination>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      searchKey: '1',
      searchMethod: '1',
      keyword: '',
      items: [
        {
          header: 'asdf',
          body: 'qwer',
        },
        {
          header: 'gggg',
          body: 'ggggggg',
        },
      ],
    }
  },
  methods: {
    getData() {
      alert(this.searchKey + this.searchMethod + this.keyword)
    },
  },
  setup() {
    return {}
  },
}
</script>
