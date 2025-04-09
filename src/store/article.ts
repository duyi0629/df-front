import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import DFRequest from "../service";

const ARTICLE_API_PATH = '/articl'

export const useArticleListStore = defineStore('article',() => {
    const fetching = ref(false)
    const data = shallowRef([{name: 124, age: 1}])

    const fetch = async (params: {}) => {

        // const res = DFRequest.get({url: ARTICLE_API_PATH})
    }   

    return {
        fetch,
        data,
        fetching
    }
})