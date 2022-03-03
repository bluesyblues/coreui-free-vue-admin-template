<template>
  <CTable>
    <CTableBody>
      <CTableRow>
        <CTableDataCell>user_id</CTableDataCell>
        <CTableDataCell>{{ userInfo.user_id }}</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  General Info
  <CTable>
    <CTableBody>
      <CTableRow>
        <CTableDataCell color="dark">username</CTableDataCell>
        <CTableDataCell>{{ userInfo.username }}</CTableDataCell>
        <CTableDataCell color="dark">email</CTableDataCell>
        <CTableDataCell>{{ userInfo.email }}</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell color="dark">created_time</CTableDataCell>
        <CTableDataCell>{{ userInfo.created_time }}</CTableDataCell>
        <CTableDataCell color="dark">last_login_time</CTableDataCell>
        <CTableDataCell>{{ userInfo.last_login_time }}</CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell color="dark">is_active</CTableDataCell>
        <CTableDataCell>
          {{ userInfo.is_active }}
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
          <CModal :visible="isActiveOpen">
            <IsActiveModify
              @close-modal="isActiveOpen = false"
              :userId="userInfo.user_id"
            >
            </IsActiveModify>
          </CModal>
        </CTableDataCell>
        <CTableDataCell color="dark">is_admin</CTableDataCell>
        <CTableDataCell>
          {{ userInfo.is_admin }}
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
          <CModal :visible="isAdminOpen">
            <IsAdminModify
              @close-modal="isAdminOpen = false"
              :userId="userInfo.user_id"
            >
            </IsAdminModify>
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
  <CModal :visible="detailInfoOpen">
    <DetailInfoModify
      @close-modal="detailInfoOpen = false"
      :userInfo="userInfo"
    >
    </DetailInfoModify>
  </CModal>
  <CTable>
    <CTableBody>
      <CTableRow>
        <CTableDataCell color="dark">privacy_policy_agreement</CTableDataCell>
        <CTableDataCell>
          {{ isEmpty(userInfo.detail_data.privacy_policy_agreement) }}
        </CTableDataCell>
        <CTableDataCell color="dark">marketing_agreement</CTableDataCell>
        <CTableDataCell>
          {{ isEmpty(userInfo.detail_data.marketing_agreement) }}
        </CTableDataCell>
      </CTableRow>
      <CTableRow>
        <CTableDataCell color="dark">first_name</CTableDataCell>
        <CTableDataCell>
          {{ isEmpty(userInfo.detail_data.first_name) }}
        </CTableDataCell>
        <CTableDataCell color="dark">last_name</CTableDataCell>
        <CTableDataCell>
          {{ isEmpty(userInfo.detail_data.last_name) }}
        </CTableDataCell>
        <CTableDataCell color="dark">company</CTableDataCell>
        <CTableDataCell>
          {{ isEmpty(userInfo.detail_data.company) }}
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
  <CModal :visible="authorityInfoOpen">
    <AuthorityInfoModify
      @close-modal="authorityInfoOpen = false"
      :userId="userInfo.user_id"
    >
    </AuthorityInfoModify>
  </CModal>
  <CTable>
    <CTableBody>
      <CTableRow>
        <CTableDataCell color="dark">
          compression_toolkit_authority
        </CTableDataCell>
        <CTableDataCell>{{ userInfo.authorities[0] }}</CTableDataCell>
        <CTableDataCell color="dark">model_search_authority</CTableDataCell>
        <CTableDataCell>{{ userInfo.authorities[1] }}</CTableDataCell>
        <CTableDataCell color="dark">device_farm_authority</CTableDataCell>
        <CTableDataCell>{{ userInfo.authorities[2] }}</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<script>
import IsActiveModify from '@/components/IsActiveModify'
import IsAdminModify from '@/components/IsAdminModify'
import DetailInfoModify from '@/components/DetailInfoModify'
import AuthorityInfoModify from '@/components/AuthorityInfoModify'
export default {
  name: 'UserInfoTable',
  data() {
    return {
      isActiveOpen: false,
      isAdminOpen: false,
      detailInfoOpen: false,
      authorityInfoOpen: false,
    }
  },
  components: {
    IsActiveModify: IsActiveModify,
    IsAdminModify: IsAdminModify,
    DetailInfoModify: DetailInfoModify,
    AuthorityInfoModify: AuthorityInfoModify,
  },
  methods: {
    isEmpty(value) {
      if (value == null || value.length === 0) {
        return 'N/A'
      } else {
        return value
      }
    },
  },
  props: ['userInfo'],
}
</script>
