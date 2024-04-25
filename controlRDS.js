const AWS = require("aws-sdk");

async function controlRDS(identifier) {
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
    // 현재 인스턴스 상태 확인
    const instanceStatus = await rds.describeDBInstances(params).promise();
    const currentState = instanceStatus.DBInstances[0].DBInstanceStatus;

    // 인스턴스가 중지 상태인 경우 인스턴스 시작
    if (currentState === "stopped") {
      rds.startDBInstance(params).promise();
      console.log("RDS 시작");
    } else {
      rds.stopDBInstance(params).promise();
      console.log("RDS 중지");
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}

module.exports = controlRDS;
