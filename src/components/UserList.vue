<template>
  <CCard class="mb-2">
    <div v-if="userList.length > 0">
      Items : {{ userList.length }} Pages : {{ currentPage + 1 }} /
      {{ userList.length / pagination + 1 }}
    </div>
    <CAccordion flush>
      <CAccordionItem :key="i" v-for="(d, i) in currentPageUserInfo">
        <CAccordionHeader v-if="keytype === 'username'">
          {{ d.username }} ({{ d.user_id.slice(0, 8) }})
        </CAccordionHeader>
        <CAccordionHeader v-else-if="keytype === 'email'">
          {{ d.email }} ({{ d.user_id.slice(0, 8) }})
        </CAccordionHeader>
        <CAccordionHeader v-else-if="keytype === 'user_id'">
          {{ d.user_id }}
        </CAccordionHeader>
        <CAccordionBody>
          <UserInfoTable :userInfo="d"></UserInfoTable>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
    <CPagination
      v-if="userList.length > 0"
      align="center"
      aria-label="Page navigation example"
    >
      <CPaginationItem @click="pagePrevious">Previous</CPaginationItem>
      <CPaginationItem @click="pageNext">Next</CPaginationItem>
    </CPagination>
  </CCard>
</template>
<script>
import UserInfoTable from '@/components/UserInfoTable'

export default {
  name: 'UserList',
  components: {
    UserInfoTable: UserInfoTable,
  },
  data() {
    return {
      pagination: 5,
      userList: [],
      keytype: '',
      keyword: '',
      method: '',
      currentPage: 0,
      currentPageUserInfo: [],
    }
  },
  mounted() {
    this.emitter.on('queryResult', this.applyUserList)
  },
  methods: {
    applyUserList(queryResult) {
      console.log('applyUserList')
      this.userList = queryResult.data
      this.keytype = queryResult.keytype
      this.keyword = queryResult.keyword
      this.method = queryResult.method
      this.getCurrentPageUserInfo()
    },
    getCurrentPageUserInfo() {
      let currentPageFirst = this.currentPage * this.pagination
      this.currentPageUserInfo = this.userList.slice(
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
      if (this.currentPage < this.userList.length / this.pagination - 1) {
        this.currentPage += 1
      }
    },
  },
  watch: {
    currentPage: function () {
      this.getCurrentPageUserInfo()
    },
  },
}
</script>
