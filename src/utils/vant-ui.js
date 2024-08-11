import Vue from 'vue';
import {Button} from 'vant';
import {Tabbar, TabbarItem} from 'vant';
import {NavBar} from 'vant';
import {Toast} from 'vant';
import {Search, Swipe, SwipeItem, Grid, GridItem} from 'vant'
import {Icon} from 'vant'
import { Rate } from 'vant';
import { ActionSheet } from 'vant';
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(Rate);
Vue.use(Icon)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
