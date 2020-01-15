const EventTeam = require('./eventTeamModel');
const requestHandler = require('../../utils/requestHandler');

async function handleAddTeamMember(req, res) {
  const { id } = req.params;
  const data = { ...req.body, event_id: id };
  try {
    const member = await EventTeam.addTeamMember(data);
    return requestHandler.success(res, 200, 'Added successfully!', { member });
  } catch (error) {
    return requestHandler.error(res, 500, `server error ${error.message}`);
  }
}

async function handleGetTeamMembers(req, res) {
  const { id } = req.params;
  try {
    const members = await EventTeam.getTeam(id);
    return requestHandler.success(res, 200, 'Fetched successfully!', {
      members
    });
  } catch (error) {
    return requestHandler.error(res, 500, `server error ${error.message}`);
  }
}

module.exports = { handleAddTeamMember, handleGetTeamMembers };
