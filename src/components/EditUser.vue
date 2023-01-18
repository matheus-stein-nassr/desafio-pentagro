<script setup lang="ts">
import FormVue from './Form.vue'
import type { User } from '../types/User'

defineProps<{ user: User }>()
</script>

<template>
  <section>
    <FormVue
:id="user.id" :username="user.userName" :fullname="user.name" :email="user.email"
      :token-expiration="user.loginExpiration" :warnings="user.receiveAutonomousWarning" :tickets="user.supervisor"
      :disabled-user="user.disabled" :unit-id="user.unitId" btn-name="" action="update" />
  </section>

  <section style="text-align: center;">
      <button style="color: red; border: 2px solid red; background-color: white;" @click="handleModal"><DeleteIcon/></button>
    </section>
</template>

<script lang="ts">
import DeleteIcon from 'vue-material-design-icons/Delete.vue';

export default {
  components: {
    DeleteIcon,
  },
  emits: ['close-modal'],
  methods: {
    handleModal() {
      this.$emit('close-modal')
    },
  },
}
</script>
