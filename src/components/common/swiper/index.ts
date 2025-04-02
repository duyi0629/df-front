import {Swiper as SwiperClass} from 'swiper';
import { Autoplay, Mousewheel, Grid, EffectFade } from 'swiper/modules'
SwiperClass.use([Autoplay, Mousewheel, Grid, EffectFade ])
export default SwiperClass
export { Swiper, SwiperSlide } from 'swiper/vue';