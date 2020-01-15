const db = require('./eventParticipantsModel');
const requestHandler = require('../../utils/requestHandler');

function handleEventsGetById(req, res) {
  const { id } = req.params;
  db.getByUserId(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Event retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(res, 404, `Event Not Found ${error.message}`);
    });
}

function handleEventGetAll(req, res) {
  db.getAll()
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'All events retrieved successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(
        res,
        404,
        `Events Not Found ${error.message}`
      );
    });
}

function handleEventRegistration(req, res) {
  const { userId } = req.decodedToken;
  const { id } = req.params;
  db.addCredentials({
    user_id: userId,
    event_id: id
  })
    .then(data => {
      return requestHandler.success(
        res,
        201,
        'Event registered successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(
        res,
        500,
        `Internal server error ${error.message}`
      );
    });
}

function handleEventDelete(req, res) {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      return requestHandler.success(
        res,
        200,
        'Event deleted successfully',
        data
      );
    })
    .catch(error => {
      return requestHandler.error(
        res,
        500,
        `Internal server error ${error.message}`
      );
    });
}

module.exports = {
  handleEventsGetById,
  handleEventGetAll,
  handleEventRegistration,
  handleEventDelete
};
