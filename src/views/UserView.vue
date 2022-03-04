<template>
  <h5>Query</h5>
  <Query></Query>
  <br />
  <UserList></UserList>
</template>
<script>
import Query from '@/components/Query'
import UserList from '@/components/UserList'

export default {
  components: {
    Query: Query,
    UserList: UserList,
  },
}
</script>
