import Koa from 'koa';
import Bodyparser from 'koa-bodyparser';
import Router from '@koa/router';

import {getItem} from './item/controller.js';

const koa = new Koa();
const router = new Router();

koa.use(Bodyparser());
router.get('/', getItem);

koa.use(router.routes());
koa.use(router.allowedMethods());

koa.listen(3000);
