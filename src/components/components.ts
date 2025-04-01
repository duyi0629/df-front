import { App} from 'vue'
import Skeleton from '@/components/common/skeleton/base.vue'

export default function(app: App) {
    app.component('Skeleton', Skeleton)
}