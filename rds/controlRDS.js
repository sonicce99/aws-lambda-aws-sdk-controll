const axios = require("axios");
const AWS = require("aws-sdk");

async function controlRDS(identifier, webhookURL) {
  const rds = new AWS.RDS();

  if (!identifier) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "identifier가 존재하지 않습니다." }),
    };
  }

  const params = {
    DBInstanceIdentifier: identifier,
  };

  try {
    let status = "";
    // 현재 인스턴스 상태 확인
    const instanceStatus = await rds.describeDBInstances(params).promise();
    const currentState = instanceStatus.DBInstances[0].DBInstanceStatus;

    // 인스턴스가 중지 상태인 경우 인스턴스 시작
    if (currentState === "stopped") {
      await rds.startDBInstance(params).promise();
      status = "시작";
      console.log("RDS 시작");
    } else {
      await rds.stopDBInstance(params).promise();
      status = "종료";
      console.log("RDS 중지");
    }

    const response = await axios.post(webhookURL, {
      text: `RDS ${status}`,
    });

    console.log("RDS WEBHOOK DATA : ", response.data);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}

module.exports = controlRDS;
