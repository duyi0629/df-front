import { RouterName } from "/@/router/routerEnum";

// define menu interface
export interface MenuItem {
    id: string,
    name: string,
    router?: string,
    icon?: string,
}

export const menus: Array<MenuItem> = [
    {
        id: RouterName.Observatorium,
        name: '星火集',
        router: '/',
        icon: '',
    },
    {
        id: RouterName.MindPleat,
        name: '碎碎念',
        router: '/mind-pleat',
        icon: '',

    },
    {
        id: RouterName.FairyLightCase,
        name: '萤光匣',
        router: '/fairy-light-case',
        icon: '',

    }
]