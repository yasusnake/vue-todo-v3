<template>
  <div class="container">
    <form>
      <div class="form-group">
        <input class="col-md-12 form-control" placeholder="Write a task" name="title" type="text"  v-model="title"/>
      </div>
      <div class="form-group">
        <input class="col-md-12 form-control" placeholder="Write a description" name="description" type="text" v-model="description"/>
      </div>
      <button type="button" class="addtask fas fa-plus-circle fa-2x" v-on:click="addTask"></button>
    </form>

    <ul v-if="tasks && tasks.length">
      <li v-for="(task, index) in tasks" v-bind:key="index" v-bind:class="[task.done ? 'Task row check' : 'Task row']">
        <h3 class="col-md-2">{{ task.title }}</h3>
        <p class="col-md-6">{{ task.description }}</p>
        <div class="form-check col-md-2">
          <button type="button" v-bind:class="[task.done ? 'col-md-12 btn btn-success' : 'col-md-12 btn btn-primary']" v-on:click="updateTasks(task)">{{ task.done ? 'Done' : 'Complete' }}</button>
        </div>
        <button type="button" class="col-md-2 btn btn-danger" v-on:click="removeTasks(task._id)">Delete Task</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Tasks',
  data() {
    return {
      title       : '',
      description : ''
    }
  },
  computed: {
    ...mapState([
      'tasks'
    ])
  },
  methods: {
    ...mapMutations([
      'ADD_TASK',
      'GET_DATA'
    ]),
    ...mapActions([
      'removeTask',
      'updateTask'
    ]),
    addTask: function() {
      if (this.title === '' || this.description === '') {
        alert('You need to write in both fields!');
      } else {
        const tempTask = {
          title       : this.title,
          description : this.description
        }
        this.ADD_TASK(tempTask)
        this.title = ''
        this.description = ''
      }
    },
    removeTasks: function(task_id) {
      this.removeTask(task_id)
    },
    updateTasks: function(task) {
      this.updateTask(task)
    }
  },
  created () {
    this.GET_DATA();
  }
}
</script>
