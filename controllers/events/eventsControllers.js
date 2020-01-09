/* eslint-disable no-use-before-define */
const moment = require('moment');
const db = require('./eventsModel');
const requestHandler = require('../../utils/requestHandler');

function handleEventsGetByUSerId(req, res) {
  const userId = req.decodedToken.subject;
  db.getByUserId(userId)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Events retrieved Successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleEventGetById(req, res) {
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Events retrieved Successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleEventsDelete(req, res) {
  const { id } = req.params;
  db.remove(id)
    .then(() => {
      return requestHandler.success(
        res,
        200,
        'your event was deleted successfully!'
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleEventsEdit(req, res) {
  const { id } = req.params;
  const userId = req.decodedToken.subject;
  const editedStartDate = moment(
    new Date(req.body.start_date),
    'MMM D LTS'
  ).format();
  const editedEndDate = moment(
    new Date(req.body.end_date),
    'MMM D LTS'
  ).format();
  const editedEvent = {
    event_title: req.body.event_title,
    event_description: req.body.event_description,
    creator_id: userId,
    start_date: editedStartDate,
    end_date: editedEndDate,
    location: req.body.location,
    guidelines: req.body.guidelines,
    participation_type: req.body.participation_type,
    category_id: req.body.category_id
  };

  db.update(id, editedEvent)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'your event was edited successfully!',
        { event: data }
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleEventsPost(req, res) {
  const startDate = moment(new Date(req.body.start_date), 'MMM D LTS').format();
  const endDate = moment(new Date(req.body.end_date), 'MMM D LTS').format();
  const userId = req.decodedToken.subject;
  const event = {
    event_title: req.body.event_title,
    event_description: req.body.event_description,
    creator_id: userId,
    start_date: startDate,
    end_date: endDate,
    location: req.body.location,
    guidelines: req.body.guidelines,
    participation_type: req.body.participation_type,
    category_id: req.body.category_id
  };

  db.add(event)
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'your event was added successfully!',
        { event_id: Number(data.toString()) }
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

function handleEventsGet(req, res) {
  db.find()
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'All Events retrieved Successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 500, `server error ${error.message}`);
    });
}

module.exports = {
  handleEventsGetByUSerId,
  handleEventGetById,
  handleEventsDelete,
  handleEventsEdit,
  handleEventsPost,
  handleEventsGet
};
