<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import type { Units } from '@/types/Units';
import { encryptPass } from '@/utils/crypto';

</script>

<template>
    <h1 style="font-size: 20px;">Gestão de Usuários</h1>
    <br>
    <form>
        <section class="collums">
            <section>
                <label for="username">Login: </label>
                <input id="username" v-model="localUsername" type="text" />
            </section>
            <label for="unit">Unidade: </label>
            <select v-model="localUnitId">
                <option v-for="unit in units" :key="unit.id" :value="unit.id">
                    {{ unit.name }}
                </option>
            </select>
        </section>

        <section class="collums">
            <section>
                <label for="fullName">Nome completo: </label>
                <input id="fullName" v-model="localFullName" type="text" />
            </section>
            <section>
                <label for="email">E-mail: </label>
                <input id="email" v-model="localemail" type="email" />
            </section>
        </section>

        <section class="collums">
            <section>
                <label for="password">Senha: </label>
                <input id="password" v-model="localPassword" type="password" />
            </section>
            <section>
                <label for="repeatPassword">Confirmação de senha: </label>
                <input id="repeatPassword" v-model="localRepeatPassword" type="password" />
            </section>
        </section>

        <section class="collum-token">
            <label>Tempo de Token: </label>
            <br>
            <input id="tokenExpire" v-model="localTokenExp" type="number" />
            <section class="checkbox">
                <input id="receiveAlert" v-model="localWarnings" type="checkbox" />
                <label for="receiveAlert">Receber Alertas?</label>
            </section>
            <section class="checkbox">
                <input id="dealTickets" v-model="localTickets" type="checkbox" />
                <label for="dealTickets">Tratar Ocorrências?</label>
            </section>
            <section class="checkbox">
                <input id="disableUser" v-model="localDisabledUser" type="checkbox" />
                <label for="disableUser">Desabilitar Usuário?</label>
            </section>
        </section>

        <p style="color: red;">{{ errorMsg? errorMsg: '' }}</p>
        
        <br>

        <section style="text-align: center;">
            <button style="color: #00bd7e; border: 2px solid #00bd7e; background-color: white;" @click.prevent="sendForm">
                <ContentSave />
                {{ btnName }}
            </button>
        </section>
    </form>
    <br><br>
</template>

<script lang="ts">
import ContentSave from 'vue-material-design-icons/ContentSave.vue';

export default {
    components: {
        ContentSave,
    },
    props: {
        id: { type: Number, default: 0 },
        username: { type: String, default: '' },
        fullname: { type: String, default: '' },
        email: { type: String, default: '' },
        tokenExpiration: { type: Number, default: 0 },
        warnings: { type: Boolean, default: false },
        tickets: { type: Boolean, default: false },
        disabledUser: { type: Boolean, default: false },
        unitId: { type: Number, default: 0 },
        btnName: { type: String, default: '' },
        action: { type: String, default: '' },
    },
    data: () => ({
        units: [] as Units[],
        localID: 0,
        localUsername: '',
        localFullName: '',
        localemail: '',
        localTokenExp: 0,
        localWarnings: false,
        localTickets: false,
        localDisabledUser: false,
        localPassword: '',
        localRepeatPassword: '',
        localUnitId: 0,
        errorMsg: '',
    }),
    created() {
        this.localID = this.id
        this.localUsername = this.username
        this.localFullName = this.fullname
        this.localemail = this.email
        this.localTokenExp = this.tokenExpiration
        this.localWarnings = this.warnings
        this.localTickets = this.tickets
        this.localDisabledUser = this.disabledUser
        this.localUnitId = this.unitId
        this.getUnits()
    },
    methods: {
        getUnits() {
            const tokenAPI = localStorage.getItem('api-token')
            fetch('http://186.237.58.167:65129/api/user/getproductionunitlist', {
                headers: {
                    Authorization: `Bearer ${tokenAPI}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => (this.units = data.productionUnitList))
                .catch((err) => console.error(err))
        },
        checkForm() {
            let check = true

            if (
                this.localUsername == '' ||
                this.localFullName == '' ||
                this.localemail == '' ||
                this.localPassword == '' ||
                this.localRepeatPassword == '' ||
                this.localUnitId == 0
            ) {
                this.errorMsg = '*Preencha todos os campos antes de finalizar.'
                check = false
            } else if (this.localPassword != this.localRepeatPassword) {
                this.errorMsg =
                    '*Os campos de Senha e Confirmação de Senha não coincidem.'
                check = false
            }

            return check
        },
        addUser() {
            const tokenAPI = localStorage.getItem('api-token')

            const check = this.checkForm()

            if (check == true) {
                const encPassword = encryptPass(this.localPassword)

                const newUserObj = {
                    id: 0,
                    userName: this.localUsername,
                    name: this.localFullName,
                    UserPassword: encPassword,
                    email: this.localemail,
                    improveTeamMember: true,
                    supervisor: true,
                    receiveAutonomousWarning: this.localWarnings,
                    loginExpiration: this.localTokenExp,
                    disabled: this.localDisabledUser,
                    system: 'G',
                    unitId: this.localUnitId,
                }

                fetch('http://186.237.58.167:65129/api/user/saveuser', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${tokenAPI}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUserObj),
                })
                    .then((res) => {
                        if (res.status == 200) {
                            window.alert('Usuário criado com sucesso.')
                        } else {
                            window.alert('Erro ao criar usuário.')
                        }
                        console.log(res)
                    })
                    .catch((err) => console.log(err))
            }
        },
        editUser() {
            const tokenAPI = localStorage.getItem('api-token')

            const check = this.checkForm()

            if (check == true) {
                const encPassword = encryptPass(this.localPassword)

                const newUserObj = {
                    id: this.localID,
                    userName: this.localUsername,
                    name: this.fullname,
                    UserPassword: encPassword,
                    email: this.localemail,
                    improveTeamMember: true,
                    supervisor: true,
                    receiveAutonomousWarning: this.localWarnings,
                    loginExpiration: this.tokenExpiration,
                    disabled: this.localDisabledUser,
                    system: 'G',
                    unitId: this.localUnitId,
                }

                fetch('http://186.237.58.167:65129/api/user/saveuser', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${tokenAPI}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUserObj),
                })
                    .then((res) => {
                        if (res.status == 200) {
                            window.alert('Usuário editado com sucesso.')
                        } else {
                            window.alert('Erro ao editar usuário.')
                        }
                        console.log(res)
                    })
                    .catch((err) => console.log(err))
            }
        },
        sendForm() {
            console.log(this.action)
            if (this.action === 'update') {
                console.log('edit')
                this.editUser()
            } else if (this.action === 'add') {
                console.log('add')
                this.addUser()
            }
        },
    },
}
</script>

<style>
section .collums {
    column-count: 2;
    padding: 10px;
    background-color: #e2e2e2;
}

section .collum-token {
    column-count: 2;
    padding: 10px;
    background-color: #e2e2e2;
    border-radius: 2px;
}

input {
    width: max-content;
}

input[type=text],
input[type=password],
input[type=email],
input[type=email],
select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #00bd7e;
}

#tokenExpire {
    width: 30px;
    padding: 12px 20px;
    margin: 8px 0;
}

input[type=checkbox] {
    width: 30px;
}

label {
    font-weight: bold;
}
</style>