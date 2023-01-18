<script setup lang="ts">
import { encryptLogin } from '@/utils/crypto';
</script> 

<template>
  <section style="text-align: center;">
    <form>
      <h1 style="font-size: 30px;">Login</h1>
      <br>
      <section>
        <input 
        id="userName" v-model="username" type="text" name="userName" placeholder="Login"
          @input="usernameCheck = false" />
        <p v-if="usernameCheck">* Usuário obrigatório
        </p>
      </section>
      <br>
      <section>
        <input 
        id="userPassword" v-model="userpass" type="password" name="userPassword" placeholder="Senha"
          @input="userpassCheck = false" />
        <p v-if="userpassCheck">* Senha obrigatória</p>
      </section>
      <br>
      <button class="button button-login" @click.prevent="handleLogin">
        Entrar
        <Login />
      </button>
    </form>
  </section>
</template>

<script lang="ts">
/* import Login from 'vue-material-design-icons/ArrowRight.vue'; */

export default {
  components: {
    /* Login, */
  },
  data: function () {
    return {
      usernameCheck: false,
      userpassCheck: false,
      username: '',
      userpass: '',
    }
  },
  methods: {
    checkForm() {
      let check = true

      if (this.username == '') {
        this.usernameCheck = true
        check = false
      }

      if (this.userpass == '') {
        this.userpassCheck = true
        check = false
      }

      return check
    },

    handleLogin() {
      const check = this.checkForm()

      if (check == true) {
        const { username, password } = encryptLogin(
          this.username.toString(),
          this.userpass.toString()
        )

        console.log(this.username)
        console.log(this.userpass)
        console.log(username)
        console.log(password)
        console.log(
          JSON.stringify({
            Username: username,
            UserPassword: password,
          })
        )

        fetch('http://186.237.58.167:65129/api/user/login', {
          method: 'POST',
          body: JSON.stringify({
            Username: username,
            UserPassword: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            if (typeof data == 'string' && data != '') {
              window.alert('Login efetuado com sucesso.')
              localStorage.setItem('api-token', data)
              this.$router.push({ path: `/dashboard` })
            } else {
              window.alert('Erro de Login.')
            }
          })
          .catch((err) => {
            window.alert('Erro de Login.')
            console.error(`!ERROR!: ${err}`)
          })
      }
    },
  },
}
</script>

<style>
p {
  color: red;
}

.button-login {
  background-color: #00bd7e;
  color: white;
  align-items: center;
  font-size: large;
  width: 15%;
  border: none;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
}

input#userName, input#userPassword {
  width: 25%;
} 
</style>
