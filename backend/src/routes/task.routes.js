import express from 'express';
import {
  createTask,
  listTasks,
  updateTaskStatus,
} from '../controllers/task.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { allowRoles } from '../middleware/rbac.middleware.js';
import { enforceTenant } from '../middleware/tenant.middleware.js';

const router = express.Router();

/**
 * TASK ROUTES
 */
router.post(
  '/',
  authenticate,
  enforceTenant,
  allowRoles('tenant_admin'),
  createTask
);

router.get(
  '/',
  authenticate,
  enforceTenant,
  listTasks
);

router.patch(
  '/:id/status',
  authenticate,
  enforceTenant,
  updateTaskStatus
);

export default router;
