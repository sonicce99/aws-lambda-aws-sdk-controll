const controlRDS = require("./controlRDS");

exports.handler = async (event) => {
  const { identifier, webhookURL } = event;
  try {
    await controlRDS(identifier, webhookURL);

    return {
      statusCode: 200,
      body: "모두 완료되었습니다.",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
