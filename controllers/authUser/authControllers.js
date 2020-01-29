const db = require('../../models/userModel');
const { generateToken } = require('../../utils/generateToken');
const requestHandler = require('../../utils/requestHandler');
const { sendEmail } = require('../../utils/emailHandler');
const Mailer = require('../../utils/mailHandler');
const server = require('../../api/server');

const register = (req, res) => {
  // endpoint to register
  try {
    const { id } = req.params;
    if (id) {
      const newUser = req.newuser;
    generateToken(res, 201, 'You are successfully signed up to hackathon', newUser);
    }
    const newUser = req.newuser;
    generateToken(res, 201, 'Signup succesful', newUser);
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err.message}`);
  }
};

const Login = (req, res) => {
  // login endpoint
  try {
    const payload = req.checked;
    generateToken(res, 200, 'Login succesful', payload);
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err}`);
  }
};

const participantInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const newUsersEmail = req.body;
    const emailBody = await Mailer.generateMailTemplate({
      receiverName: newUsersEmail.email,
      intro: 'Invite as Participant',
      text: 'Hacky team want you to be part of team members, click the button below to join or ignore if not interested.',
      actionBtnText:  "Join as Participant",
      actionBtnLink: `https://staging.hackton.co/register?team=${id}`
    });
    sendEmail(
      'Invite to join Hackaton event',
      newUsersEmail.email,
     emailBody
    );
    return requestHandler.success(
      res,
      200,
      'Invite sent successfully'
    );
  } catch (err) {
    return requestHandler.error(res, 500, `server error ${err.message}`);
  }
};

const getAuthToken = async (req, res) => {
  try {
    const data = server.locals;
    if (!data) {
      res.status(400).json({
        statusCode: 400,
        message: 'Authentication Failed'
      });
    }
    const user = await db.createOrFindUser(data);
    if (user) {
      req.user = server.locals;
      generateToken(
        res,
        200,
        `${req.user.authType} Login was successfull`,
        user
      );
    }
  } catch (error) {
    return error;
  }
};

module.exports = { register, Login, getAuthToken, participantInvite };
