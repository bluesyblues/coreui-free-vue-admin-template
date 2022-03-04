<template>
  <CCard class="mb-2" v-if="logList.length > 0">
    <CRow>
      <CCol align="left">
        <div>User ID : {{ userId }}</div>
      </CCol>
      <CCol>
        <div align="right">
          Items : {{ logList.length }} Pages : {{ currentPage + 1 }} /
          {{ Math.floor(logList.length / pagination) + 1 }}
        </div>
      </CCol>
    </CRow>
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Session ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Log type</CTableHeaderCell>
          <CTableHeaderCell scope="col">Datetime</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody :key="i" v-for="(d, i) in currentPageLog">
        <CTableRow>
          <CTableHeaderCell scope="row">{{ i + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ d.session_id }}</CTableDataCell>
          <CTableDataCell>{{ d.logtype }}</CTableDataCell>
          <CTableDataCell>{{ d.regdatetime }}</CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <CPagination
      v-if="logList.length > 0"
      align="center"
      aria-label="Page navigation example"
    >
      <CPaginationItem @click="pagePrevious">Previous</CPaginationItem>
      <CPaginationItem @click="pageNext">Next</CPaginationItem>
    </CPagination>
  </CCard>
</template>
<script>
export default {
  name: 'LogList',
  data() {
    return {
      userId: '',
      pagination: 5,
      logList: [],
      currentPage: 0,
      currentPageLog: [],
    }
  },
  mounted() {
    this.emitter.on('queryLogResult', this.applyLogList)
  },
  methods: {
    applyLogList(queryResult) {
      this.logList = queryResult.data
      this.userId = queryResult.userId
      this.getCurrentPageLog()
    },
    getCurrentPageLog() {
      let currentPageFirst = this.currentPage * this.pagination
      this.currentPageLog = this.logList.slice(
        currentPageFirst,
        currentPageFirst + this.pagination,
      )
    },
    pagePrevious() {
      if (this.currentPage > 0) {
        this.currentPage -= 1
      }
    },
    pageNext() {
      if (this.currentPage < this.logList.length / this.pagination - 1) {
        this.currentPage += 1
      }
    },
  },
  watch: {
    currentPage: function () {
      this.getCurrentPageLog()
    },
  },
}
</script>
