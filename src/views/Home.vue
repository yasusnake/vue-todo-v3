<template>
  <div class="home">
    <header id="header">
      <h1>To Do List</h1>
    </header>
    <Tasks />
  </div>
</template>

<script>
// @ is an alias to /src
import Tasks from '@/components/Tasks.vue'

export default {
  name: 'home',
  components: {
    Tasks
  }
}
</script>
