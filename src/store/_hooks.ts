import { Pinia } from  'pinia'
import { useArticleDetailStore, useArticleListStore } from './article'


export const useStores = (pinia?: Pinia) => {
    const artilceList = useArticleListStore(pinia)
    const artilceDetail = useArticleDetailStore(pinia)
    console.log(artilceList, 'artilceListartilceListartilceList')
    return {
        artilceList,
        artilceDetail
    }
}