<template>
  <CCard cclas="mb-3 mt-0">
    <CContainer>
      <CRow>
        <CCol md="3">User ID</CCol>
        <CCol md="6">
          <CFormInput
            v-model="userId"
            placeholder="userId"
            aria-label="userId"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="3">Start Datetime</CCol>
        <CCol md="3">
          <CFormInput
            v-model="startDate"
            placeholder="startDate"
            aria-label="startDate"
          />
        </CCol>
        <CCol md="3">
          <CFormInput
            v-model="startTime"
            placeholder="startTime"
            aria-label="startTime"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="3">End Datetime</CCol>
        <CCol md="3">
          <CFormInput
            v-model="endDate"
            placeholder="endDate"
            aria-label="endDate"
          />
        </CCol>
        <CCol md="3">
          <CFormInput
            v-model="endTime"
            placeholder="endTime"
            aria-label="endTime"
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md="4">
          <CButton
            :disabled="userId.length < 1"
            type="button"
            color="secondary"
            variant="outline"
            id="button-addon2"
            @click="getData"
            >Query
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  </CCard>
</template>
<script>
const adjustDate = function (value) {
  if (value.length == 1) {
    return '0' + value
  } else {
    return value
  }
}

const today = new Date()
let todayYear = today.getFullYear()
let todayMonth = adjustDate(String(today.getMonth() + 1))
let todayDate = adjustDate(String(today.getDate() + 1))

let weekAgo = new Date(today)
weekAgo.setDate(today.getDate() - 7)
const weekAgoYear = weekAgo.getFullYear()
const weekAgoMonth = adjustDate(String(weekAgo.getMonth() + 1))
const weekAgoDate = adjustDate(String(weekAgo.getDate()))

export default {
  name: 'Query',
  data() {
    return {
      userId: '',
      startDate: weekAgoYear + '-' + weekAgoMonth + '-' + weekAgoDate,
      startTime: '00:00:00',
      endDate: todayYear + '-' + todayMonth + '-' + todayDate,
      endTime: '00:00:00',
      logList: [],
    }
  },
  mounted() {
    this.emitter.on('refresh', this.getData)
  },
  methods: {
    async getData() {
      await this.axiosInstance({
        method: 'post',
        url: 'http://127.0.0.1:8888/api/v1/query_user_logs',
        data: {
          user_id: this.userId,
          start_time: this.startDate + ' ' + this.startTime,
          end_time: this.endDate + ' ' + this.endTime,
          admin_tokens: {
            access_token: localStorage.getItem('access_token'),
          },
        },
      }).then((response) => {
        let queryResult = {
          data: response.data,
          userId: this.userId,
        }
        this.emitter.emit('queryLogResult', queryResult)
      })
    },
  },
}
</script>
