const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const handler = (req, res) => {
  const { method, body } = req;

  const message = {
    from: process.env.SENDGRID_AUTHORIZED_EMAIL,
  };

  try {
    if (method !== "POST") {
      res.json({ message: "Try a POST!" });
    }

    if (body) {
      message.to = process.env.SENDGRID_AUTHORIZED_EMAIL;
      message.subject = req.body.subject;
      message.text = req.body.text;
      message.html = req.body.text;
    }

    return sendgrid.send(message).then(
      () => {
        res.status(200).json({
          message: "I will send email",
        });
      },
      (error) => {
        console.error(error);
        if (error.response) {
          return res.status(500).json({
            error: error.response,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "There was an error", error: err });
  }
};

module.exports = handler;
