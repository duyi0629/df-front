import { PropType, computed, defineComponent, h } from "vue";
import { RouterLink, RouterLinkProps, type RouteLocationRaw } from "vue-router";

type LinkType ='internal' | 'external'

export default defineComponent({
  name: "DFLink",
  props: {
    /**
     * 内部路由路径，支持 Vue Router 的 RouteLocationRaw 类型
     * 当包含协议头时会自动识别为外部链接
     */
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: false,
    },
    /**
     * 外部链接地址（必须包含协议头）
     */
    href: {
      type: String,
      validator: (v: string) => v.startsWith("http"),
      default: undefined,
    },
    /**
     * 是否在新窗口打开（默认 true）
     */
    blank: {
      type: Boolean,
      default: false,
    },
        /**
     * 是否添加安全属性（默认 true）
     * 会自动添加 noopener noreferrer nofollow
     */
        secure: {
            type: Boolean,
            default: true
          },
    /**
     * 透传给 RouterLink 的配置
     */
    routerLinkProps: {
      type: Object as PropType<Omit<RouterLinkProps, "to">>,
      default: () => ({}),
    },
  },


  setup(props, { attrs, slots }) {
    // 链接类型判断
    const linkType = computed<LinkType>(() => {
      if (props.href) return 'external'
      if (typeof props.to === 'string' && props.to.startsWith('http')) {
        return 'external'
      }
      return 'internal'
    })

    // 安全属性生成
    const securityAttrs = computed(() => {
      if (linkType.value !== 'external' || !props.secure) return {}
      return {
        rel: 'noopener noreferrer nofollow',
        target: props.blank ? '_blank' : undefined
      }
    })

    // 最终链接地址
    const finalHref = computed(() => {
      return props.href || (typeof props.to === 'string' ? props.to : '')
    })

    return () => {
      // 属性冲突检测
      if (props.to && props.href) {
        throw new Error('DFLink] to 和 href 属性不能同时存在')
      }

      // 外部链接渲染
      if (linkType.value === 'external') {
        return h(
          'a',
          {
            ...attrs,
            ...securityAttrs.value,
            href: finalHref.value
          },
          slots.default?.()
        )
      }

      // 内部路由链接渲染
      if (props.to) {
        return h(
          RouterLink,
          {
            ...attrs,
            ...props.routerLinkProps,
            to: props.to,
            class: 'text-black dark:text-white'
          },
          slots.default
        )
      }

      // 错误处理
      throw new Error('DFLink] 必须提供 to 或 href 属性')
    }
  }
})
