const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");

const bedrockTutorial = async() => {
    const client = new BedrockRuntimeClient({ region: "us-east-1" });
    const input = {
        modelId: "ai21.j2-mid-v1",
        contentType: "application/json",
        accept: "*/*",
        body: JSON.stringify({prompt:'how to calm a cry baby?',maxTokens:200,temperature:0.7,topP:1,stopSequences:[],countPenalty:{scale:0},presencePenalty:{scale:0},frequencyPenalty:{scale:0}})
    };

    const command = new InvokeModelCommand(input);

    try {
        const data = await client.send(command);

        const response = JSON.parse(Buffer.from(data.body).toString('utf8'))
        console.log(response.completions[0].data.text);
    } catch (error) {
        console.log(error);
    }
}

bedrockTutorial();