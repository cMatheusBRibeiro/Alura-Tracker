<template>
    <Box>
        <div class="columns">
            <div class="column is-5">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column is-3">{{ tarefa?.projeto?.nome || 'Projeto não selecionado' }}</div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
            <div class="column is-2">
                <router-link class="button" :to="`/tarefas/${ tarefa.id }`">
                    <span class="icon is-small">
                        <i class="fas fa-pencil-alt"></i>
                    </span>
                </router-link>
                <button class="button ml-2 is-danger" @click="excluir">
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import Cronometro from './Cronometro.vue'
import Box from './Box.vue'
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";

export default defineComponent({
    name: 'Tarefa',
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    components: {
        Cronometro,
        Box
    },
    methods: {
        excluir() {
            this.store.commit(EXCLUIR_TAREFA, this.tarefa.id)
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>