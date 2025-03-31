// 条件性添加类名：在实际开发中，一个元素可能会根据不同的状态（如是否激活、是否禁用等）应用不同的 CSS 类。clsx 可以让你根据条件动态地添加或移除类名。
// 简化类名拼接：手动拼接类名时容易出错，尤其是当有多个条件和多个类名需要组合时。clsx 提供了一种更简洁、更安全的方式来处理类名拼接。
import clsx from "clsx";
// 避免冲突类名：Tailwind CSS 允许通过组合多个类名来构建样式，但有时候不同的类可能会相互冲突。例如，text-red-500 和 text-blue-500 都用于设置文本颜色，同时使用会导致冲突。tailwind-merge 会智能地合并这些类名，只保留最后一个有效的类，避免样式冲突。
// 减少重复类名：在动态生成类名时，可能会出现重复的类名。tailwind-merge 会自动去除重复的类名，使最终的类名列表更加简洁。
// 优化性能：减少类名的数量可以降低浏览器解析 CSS 的负担，从而提高页面的加载性能。
import { twMerge } from 'tailwind-merge'
function cn(...inputs){
    return twMerge(clsx(inputs))
}

export {
    cn
}