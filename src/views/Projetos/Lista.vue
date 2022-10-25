<template>
    <section>
        <router-link class="button" to="/projetos/novo">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link class="button" :to="`/projetos/${projeto.id}`">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { OBTER_PROJETOS } from "@/store/tipo-acoes";
import { ADICIONAR_PROJETO, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: 'Lista',
    data() {
        return {
            nomeDoProjeto: ''
        }
    },
    methods: {
        salvar() {
            this.store.commit(ADICIONAR_PROJETO, this.nomeDoProjeto)
            this.nomeDoProjeto = ''
        },
        excluir(id: string) {
            this.store.commit(EXCLUIR_PROJETO, id)
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>