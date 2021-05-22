import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import searchForm from './components/SearchForm'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.component('searchForm', searchForm)
app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'mini', zIndex: 3000, locale })
app.mount('#app')