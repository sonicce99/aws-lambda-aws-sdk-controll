const controlEC2 = require("./controlEC2");

exports.handler = async (event) => {
  // const { instanceId, webhookURL } = event;
  const instanceId = process.env.instanceId;
  const webhookURL = process.env.webhookURL;

  try {
    await controlEC2(instanceId, webhookURL);

    return {
      statusCode: 200,
      body: "모두 완료되었습니다.",
    };
  } catch (error) {
    console.log(error);
    if (error.message) {
      const message = error.message;

      if (message === "no_instanceId") {
        console.log("instanceId가 존재하지 않습니다.");

        return {
          statusCode: 401,
          body: JSON.stringify({ error: "instanceId가 존재하지 않습니다." }),
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
