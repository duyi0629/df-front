import { Pinia } from  'pinia'
import { useArticleListStore } from './article'


export const useStores = (pinia?: Pinia) => {
    const artilceList = useArticleListStore(pinia)
    console.log(artilceList, 'artilceListartilceListartilceList')
    return {
        artilceList
    }
}