<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="" disabled>Selecione o projeto</option>
                        <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoFinalizarTemporizador="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { key } from '@/store'
import { ADICIONAR_TAREFA } from '@/store/tipo-mutacoes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Temporizador from './Temporizador.vue'

export default defineComponent({
    name: 'Formulario',
    components: {
        Temporizador
    },
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoEmSegundos: number) : void {
            this.store.commit(ADICIONAR_TAREFA, {
                duracaoEmSegundos: tempoEmSegundos,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id === this.idProjeto)
            })
            this.descricao = ''
        }
    },
    setup() {
        const store = useStore(key) 

        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>

<style>
.formulario {
    background: var(--bg-primario);
    color: var(--texto-primario);
}
</style>