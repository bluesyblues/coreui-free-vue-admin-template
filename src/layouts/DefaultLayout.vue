<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
  methods: {
    async tokenValidation() {
      await this.axiosInstance({
        method: 'post',
        url: this.url + '/token_validation',
        data: {
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          this.$forceUpdate()
          this.$router.push('/login')
        })
    },
  },
  created() {
    this.tokenValidation()
  },
}
</script>
