import { createPinia } from "pinia";
import { useStores } from './_hooks'
export  { useStores } from './_hooks'
export const createStore = () => {
    const pinia = createPinia()
    return {
        get stores ()  {
            return useStores(pinia)
        },
        state: pinia.state,
        install: pinia.install,

    }
}