<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador';
import { useStore } from "@/store";
import { ADICIONAR_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutacoes";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    mounted () {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id === this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data () {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar () {
            if (this.id)
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            else
                this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto)

            this.notificar(TipoNotificacao.SUCCESSO, 'Um novo projeto foi salvo', `O projeto "${ this.nomeDoProjeto }" já está disponível.`)
            this.nomeDoProjeto = ''
            this.$router.push('/projetos')
        }
    },
    setup () {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})
</script>