<template>
    <div class="edicao">
        <h1 class="title">Tarefa</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="descricaoDaTarefa" class="label">Descrição da Tarefa</label>
                <input type="text" class="input" v-model="descricao" id="descricaoDaTarefa">
            </div>
            <div class="field">
                <label for="projetoDaTarefa" class="label">Projeto da Tarefa</label>
                <div class="select">
                    <select id="projetoDaTarefa" v-model="projeto">
                        <option value="" disabled>Selecione um projeto</option>
                        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">{{ projeto.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="field">
                {{ tempoDecorrido }}
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ALTERA_TAREFA } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: 'Edicao',
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            descricao: '',
            projeto: '',
            duracaoEmSegundos: 0
        }
    },
    mounted() {
        const tarefa = this.store.state.tarefas.find(t => t.id === this.id)
        if (tarefa) {
            this.descricao = tarefa.descricao
            this.projeto = tarefa?.projeto?.id || ''
            this.duracaoEmSegundos = tarefa.duracaoEmSegundos
        }
    },
    computed: {
        tempoDecorrido() {
            return new Date(this.duracaoEmSegundos * 1000).toISOString().substr(11, 8)
        }
    },
    methods: {
        salvar() {
            this.store.commit(ALTERA_TAREFA, {
                id: this.id,
                descricao: this.descricao,
                duracaoEmSegundos: this.duracaoEmSegundos,
                projeto: this.store.state.projetos.find(proj => proj.id === this.projeto)
            })
            this.$router.push('/')
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style scoped>
.edicao {
    padding: 1.25rem;
}
</style>