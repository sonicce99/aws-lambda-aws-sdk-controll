const AWS = require("aws-sdk");

async function controlEC2(instanceId) {
  const ec2 = new AWS.EC2();

  if (!instanceId) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "instanceId가 존재하지 않습니다." }),
    };
  }

  // 인스턴스를 시작하거나 중지하기 위한 명령
  const params = {
    InstanceIds: [instanceId],
  };

  try {
    const instanceState = await ec2.describeInstances(params).promise();

    // 현재 인스턴스 상태에 따라 다음 동작 결정
    const currentState = instanceState.Reservations[0].Instances[0].State.Name;

    if (currentState === "stopped") {
      await ec2.startInstances(params).promise();
      console.log("EC2 시작");
    } else {
      await ec2.stopInstances(params).promise();
      console.log("EC2 중지");
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}

module.exports = controlEC2;
