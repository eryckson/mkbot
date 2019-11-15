const User = require('../database/user');
const EmailConfirmation = require('../database/email-confirmation');

class ConfirmationRoute {
  constructor(client, app) {
    this.client = client;
    this.app = app;
  }

  addRoutes() {
    this.app.get('/confirm/:token', async (req, res, next) => {
      const { token } = req.params;
      const conf = await EmailConfirmation.find(this.client, { token, confirmed_at: null });
      if (!conf) {
        return res.redirect('/?msg=bad+confirmation');
      }

      const { discord_user_id, email } = conf;
      const user = await User.find(this.client, { discord_user_id });
      if (!user) {
        await User.create(this.client, { discord_user_id, email });
      } else {
        user.email = conf.email;
        await user.save();
      }

      conf.confirmed_at = new Date();
      await conf.save();

      res.redirect('/?msg=email+confirmed');
    });
  }
}

module.exports = ConfirmationRoute;
