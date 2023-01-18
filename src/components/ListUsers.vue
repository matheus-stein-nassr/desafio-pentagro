<script setup lang="ts">
  import type { User } from '../types/User'

  import CustomTable from './Table.vue'
  import EditUser from './EditUser.vue'
</script>

<template>
  <section>
    <h1 style="font-size: 20px;">Usuários Cadastrados</h1>
    <br>
    <p v-if="usersList.length < 1">* Nenhum usuário encontrado</p>
    <section>
      <CustomTable :users="usersList" @open-modal="openModal" />
    </section>
    
    <section v-if="showModal">
      <EditUser :user="selectedUserEdit" @close-modal="closeModal" />
    </section>
  </section>
</template>

<script lang="ts">
  export default {
    components: {
      EditUser: EditUser,
    },
    data: () => ({
      usersList: [] as User[],
      disabledCount: 0,
      showModal: false,
      selectedUserEdit: {} as User,
    }),
    created() {
      this.getUsers()
    },
    methods: {
      getUsers() {
        const tokenAPI = localStorage.getItem('api-token')
        fetch('http://186.237.58.167:65129/api/user/getusers', {
          headers: {
            Authorization: `Bearer ${tokenAPI}`,
          },
        })
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            this.usersList = data
            this.disabledCount = this.usersList.filter(
              (item) => item.disabled == true
            ).length
          })
          .catch((err) => console.error(err))
      },
      openModal(selectedUser: User) {
        this.showModal = true
        this.selectedUserEdit = selectedUser
      },
      closeModal() {
        this.showModal = false
      },
    },
  }
</script>
