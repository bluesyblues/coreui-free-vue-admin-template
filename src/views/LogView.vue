<template>
  <h5>Query</h5>
  <QueryLog></QueryLog>
  <br />
  <LogList></LogList>
</template>
<script>
import QueryLog from '@/components/QueryLog'
import LogList from '@/components/LogList'

export default {
  components: {
    QueryLog: QueryLog,
    LogList: LogList,
  },
}
</script>
