<script setup lang="ts">
import type { User } from '../types/User'

defineProps<{ users: User[] }>()
</script>

<template>
    <div style="overflow: auto; height: 300px">
        <table class="table">
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.disabled ? 'Inativo' : 'Ativo' }}</td>
                <td style="text-align: center;">
                    <button @click="() => handleModal(user)">
                        <PencilBoxOutline />
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import PencilBoxOutline from 'vue-material-design-icons/PencilBoxOutline.vue';

export default {
    components: {
        PencilBoxOutline
    },
    emits: ['open-modal'],
    methods: {
        handleModal(user: User) {
            this.$emit('open-modal', user)
        },
    },
}
</script>
