import { App} from 'vue'
import Skeleton from '@/components/common/skeleton/base.vue'
import DFLink from '/@/components/common/df-link'

export default function(app: App) {
    app.component('Skeleton', Skeleton)
    app.component('DFLink', DFLink)
}