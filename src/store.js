import Vue from 'vue'
import Vuex from 'vuex'
import VueLodash from 'vue-lodash'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks  : [],
    errors : []
  },
  getters: {
    countTasks: state => {
      return state.tasks.length;
    }
  },
  mutations: {
    GET_DATA: async function () {
      try {
        const res = await axios.get('https://dnamic.lib.id/practiceserver/get/')
        console.log('Axios', res.data);
        this.state.tasks = res.data;
      } catch (e) {
        this.state.errors.push(e);
      }
    },
    ADD_TASK: async (state, task) => {
      try {
        const { data } = await axios.post('https://dnamic.lib.id/practiceserver/create/', task)
        state.tasks.push(task)
      } catch (e) {
        console.log('Error', e)
      }
    },
    REMOVE_TASK: async (state, task_id) => {
      try {
        const { data } = await axios.post('https://dnamic.lib.id/practiceserver/delete/', {_id : task_id})
        state.tasks = state.tasks.filter((task) => task_id !== task._id);
      } catch (e) {
        console.log('Error', e);
      }
    },
    UPDATE_TASK: async (state, task) => {
      try {
        console.log('Update', task)
        const { data } = await axios.post('https://dnamic.lib.id/practiceserver/update/', {
          title       : task.title,
          description : task.description,
          _id         : task._id,
          done        : !task.done
        })
        const tasks = state.tasks;
        const indexToReplace = _.findIndex(tasks, {_id : task._id});
        tasks[indexToReplace].done = !tasks[indexToReplace].done;
      } catch (e) {
        console.log('Error', e);
      }
    }
  },
  actions: {
    removeTask: (context, task) => {
      context.commit("REMOVE_TASK", task)
    },
    updateTask: (context, task) => {
      context.commit("UPDATE_TASK", task)
    }
  }
})
