const controlRDS = require("./controlRDS");

exports.handler = async (event) => {
  // const { identifier, webhookURL } = event;
  const identifier = process.env.identifier;
  const webhookURL = process.env.webhookURL;

  try {
    await controlRDS(identifier, webhookURL);

    return {
      statusCode: 200,
      body: "모두 완료되었습니다.",
    };
  } catch (error) {
    console.log(error);
    if (error.message) {
      const message = error.message;

      if (message === "no_identifier") {
        console.log("identifier가 존재하지 않습니다");

        return {
          statusCode: 401,
          body: JSON.stringify({ error: "identifier가 존재하지 않습니다" }),
        };
      }
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
    }
  }
};
