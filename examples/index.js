const { NettuClient } = require("../dist");

const apikey = "rpDrN3buDOI9ExUKdQJMg2UzTl4pOIZzElEXMo+dNUw=";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjFmODg2ZTBiMThhMDAyMTE4YTMxZWUiLCJpYXQiOjE1OTU5MDIwNjIsImV4cCI6MTU5NzExMTY2Mn0.Uk520LtjC1H_aNf7RJ4WUxN0mb4ctkmmrqDMvKpRfGM";
const client = NettuClient.create(token);

const init = async () => {
  const { userId } = await client.users.createUser({
    name: "Hello SDK",
  });
  const { accessToken } = await client.users.createToken(userId);
  console.log({
    userId,
    accessToken,
  });
};

const init2 = async () => {
  const data = await client.conferences.get("5e4bfaba8f2384009be7f2c6");
};

init2();
