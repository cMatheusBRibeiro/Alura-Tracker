<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
        <Botao @click="iniciarTarefa" icone="fas fa-play" :desabilitado="cronometroRodando" texto="play" />
        <Botao @click="finalizarTarefa" icone="fas fa-stop" :desabilitado="!cronometroRodando" texto="stop" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cronometro from './Cronometro.vue'
import Botao from './Botao.vue'

export default defineComponent({
    name: 'Temporizador',
    emits: ['aoFinalizarTemporizador'],
    components: {
        Cronometro,
        Botao
    },
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciarTarefa () {
            console.log('iniciando')
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos++
            }, 1000)
        },
        finalizarTarefa () {
            console.log('finalizando')
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoFinalizarTemporizador', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    }
})
</script>