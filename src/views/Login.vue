<template>
  <div class="input-group mb-3">
    <CTable>
      <CTableBody>
        <CTableRow>
          <CTableDataCell>
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableDataCell>
            <input
              v-model="password"
              type="text"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <CButtonToolbar justify="between">
      <CButton
        type="button"
        color="secondary"
        variant="outline"
        id="button-addon2"
        @click="getLoginData"
        >Login
      </CButton>
    </CButtonToolbar>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    getLoginData() {
      axios({
        method: 'post',
        url: 'http://3.38.129.150:8888/api/v1/login',
        data: {
          username: this.username,
          password: this.password,
        },
      }).then(function (response) {
        const access_token = response.data.tokens.access_token
        const refresh_token = response.data.tokens.refresh_token
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
      })
    },
  },
  setup() {
    return {}
  },
}
</script>
