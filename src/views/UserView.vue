<template>
  <h5>Query</h5>
  <Query></Query>
  <br />
  <h5>Result</h5>
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
