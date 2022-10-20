<template>
    <button @click="emitirClick" class="button" :disabled="desabilitado">
        <span class="icon">
            <i :class="icone"></i>
        </span>
        <span>{{ texto }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
    name: 'Botao',
    props: {
        texto: {
            type: String,
            default: ''
        },
        icone: {
            type: String,
            default: 'fas fa-play'
        },
        desabilitado: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click'],
    methods: {
        emitirClick () {
            this.$emit('click')
        }
    }
})
</script>

<style>

</style>