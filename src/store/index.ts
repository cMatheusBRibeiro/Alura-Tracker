import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { InjectionKey } from 'vue';
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from './modulos/projeto'
import { EstadoTarefa, tarefa } from "./modulos/tarefa";


export interface Estado {
    projeto: EstadoProjeto;
    tarefa: EstadoTarefa;
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        },
        notificacoes: []
    },
    mutations: {
        [NOTIFICAR](state, notificacao: INotificacao) {
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== notificacao.id)
            }, 3000)
        }
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}