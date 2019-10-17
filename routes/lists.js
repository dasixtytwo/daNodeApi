const express = require('express');
const router = express.Router();
const ListController = require('../controllers/listController');

const { authenticate } = require('../helpers');

/**
 * GET /lists
 * Purpose: Get all lists
 */
router.get('/', authenticate, ListController.getAllList);

/**
 * POST /lists
 * Purpose: Create a list
 */
router.post('/', authenticate, ListController.createList);

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
router.patch('/:id', authenticate, ListController.updateList);

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
router.delete('/:id', authenticate, ListController.deleteList);

/**
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks in a specific list
 */
router.get('/:listId/tasks', authenticate, ListController.getAllTaskList);

/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
router.post('/:listId/tasks', authenticate, ListController.createListTask);

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
router.patch(
	'/:listId/tasks/:taskId',
	authenticate,
	ListController.updateTaskList
);

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
router.delete(
	'/:listId/tasks/:taskId',
	authenticate,
	ListController.deleteTaskList
);

module.exports = router;
