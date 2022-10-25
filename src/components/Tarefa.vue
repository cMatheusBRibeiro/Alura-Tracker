<template>
    <Box>
        <div class="columns" @click="tarefaClicada">
            <div class="column is-5">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column is-3">{{ tarefa?.projeto?.nome || 'N/D' }}</div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
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

export default defineComponent({
    name: 'Tarefa',
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    emits: ['aoTarefaClicada'],
    components: {
        Cronometro,
        Box
    },
    methods: {
        tarefaClicada() {
            this.$emit('aoTarefaClicada', this.tarefa)
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