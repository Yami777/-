// dayjs默认的语言是英语
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
// 配置全局语言为中文
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)
export default dayjs
