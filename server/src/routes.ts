import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as UserController from './controllers/user';
import * as RoutineController from './controllers/routine';
import * as RewardsController from './controllers/rewards';
import * as GoalsController from './controllers/goals';

const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
};

const router = Router();

// user routes
router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.post('/user/refresh', UserController.refresh);
router.post('/user/', UserController.getUser);

// routine routes
router.post('/routine/add', RoutineController.addTasks);
router.delete('/routine/delete', RoutineController.removeTasks);
router.post('/routine/create', RoutineController.create);
router.get('/routine', RoutineController.get);
router.post('/routine/cheat', RoutineController.cheatDay);
router.post('/routine/check', RoutineController.checkTask);
router.patch('/routine/update', RoutineController.updateRoutine);

// rewards routes
router.get('/rewards/', RewardsController.get);
router.post('/rewards/add', RewardsController.add);
router.delete('/rewards/delete', RewardsController.deleteRewards);

// goals routes
router.get('/goals/', GoalsController.get);
router.post('/goals/add', GoalsController.add);
router.delete('/goals/delete', GoalsController.deleteGoals);

// Dev routes
if (process.env.NODE_ENV === 'development') {
    router.use('/dev/api-docs', swaggerUi.serve as any);
    router.get(
        '/dev/api-docs',
        swaggerUi.setup(apiSpec, swaggerUiOptions) as any
    );
}

export default router;
