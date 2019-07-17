import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: index
        }
    ]
})
