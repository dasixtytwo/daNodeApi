// Load List Model
const { List, Task } = require('../models');

const { deleteTasksFromList } = require('../helpers');

exports.getAllList = (req, res) => {
	// We want to return an array of all the lists that belong to the authenticated user
	List.find({
		_userId: req.user_id
	})
		.then(lists => {
			res.send(lists);
		})
		.catch(e => {
			res.send(e);
		});
};

exports.createList = (req, res) => {
	// We want to create a new list and return the new list document back to the user (which includes the id)
	// The list information (fields) will be passed in via the JSON request body
	let title = req.body.title;

	let newList = new List({
		title,
		_userId: req.user_id
	});
	newList.save().then(listDoc => {
		// the full list document is returned (incl. id)
		res.send(listDoc);
	});
};

exports.updateList = (req, res) => {
	// We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
	List.findOneAndUpdate(
		{ _id: req.params.id, _userId: req.user_id },
		{
			$set: req.body
		}
	).then(() => {
		res.send({ message: 'updated successfully' });
	});
};

exports.deleteList = (req, res) => {
	// We want to delete the specified list (document with id in the URL)
	List.findOneAndRemove({
		_id: req.params.id,
		_userId: req.user_id
	}).then(removedListDoc => {
		res.send(removedListDoc);

		// delete all the tasks that are in the deleted list
		deleteTasksFromList(removedListDoc._id);
	});
};

exports.getAllTaskList = (req, res) => {
	// We want to return all tasks that belong to a specific list (specified by listId)
	Task.find({
		_listId: req.params.listId
	}).then(tasks => {
		res.send(tasks);
	});
};

exports.createListTask = (req, res) => {
	// We want to create a new task in a list specified by listId

	List.findOne({
		_id: req.params.listId,
		_userId: req.user_id
	})
		.then(list => {
			if (list) {
				// list object with the specified conditions was found
				// therefore the currently authenticated user can create new tasks
				return true;
			}

			// else - the list object is undefined
			return false;
		})
		.then(canCreateTask => {
			if (canCreateTask) {
				let newTask = new Task({
					title: req.body.title,
					_listId: req.params.listId
				});
				newTask.save().then(newTaskDoc => {
					res.send(newTaskDoc);
				});
			} else {
				res.sendStatus(404);
			}
		});
};

exports.updateTaskList = (req, res) => {
	// We want to update an existing task (specified by taskId)

	List.findOne({
		_id: req.params.listId,
		_userId: req.user_id
	})
		.then(list => {
			if (list) {
				// list object with the specified conditions was found
				// therefore the currently authenticated user can make updates to tasks within this list
				return true;
			}

			// else - the list object is undefined
			return false;
		})
		.then(canUpdateTasks => {
			if (canUpdateTasks) {
				// the currently authenticated user can update tasks
				Task.findOneAndUpdate(
					{
						_id: req.params.taskId,
						_listId: req.params.listId
					},
					{
						$set: req.body
					}
				).then(() => {
					res.send({ message: 'Updated successfully.' });
				});
			} else {
				res.sendStatus(404);
			}
		});
};

exports.deleteTaskList = (req, res) => {
	List.findOne({
		_id: req.params.listId,
		_userId: req.user_id
	})
		.then(list => {
			if (list) {
				// list object with the specified conditions was found
				// therefore the currently authenticated user can make updates to tasks within this list
				return true;
			}

			// else - the list object is undefined
			return false;
		})
		.then(canDeleteTasks => {
			if (canDeleteTasks) {
				Task.findOneAndRemove({
					_id: req.params.taskId,
					_listId: req.params.listId
				}).then(removedTaskDoc => {
					res.send(removedTaskDoc);
				});
			} else {
				res.sendStatus(404);
			}
		});
};
