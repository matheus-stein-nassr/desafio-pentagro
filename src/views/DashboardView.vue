<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <section>
    <nav>
      <RouterLink to="/dashboard">
        Listar Usuários
      </RouterLink>

      <RouterLink to="/dashboard/register">
        Cadastrar Usuário
      </RouterLink>

      <RouterView :key="$route.path"></RouterView>
    </nav>
  </section>
</template>