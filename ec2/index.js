const controlEC2 = require("./controlEC2");

exports.handler = async (event) => {
  const { instanceId, webhookURL } = event;
  try {
    await controlEC2(instanceId, webhookURL);

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
