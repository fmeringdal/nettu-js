const { NettuClient } = require("../dist");

const apikey = "rpDrN3buDOI9ExUKdQJMg2UzTl4pOIZzElEXMo+dNUw=";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjFmODg2ZTBiMThhMDAyMTE4YTMxZWUiLCJpYXQiOjE1OTU5MDIwNjIsImV4cCI6MTU5NzExMTY2Mn0.Uk520LtjC1H_aNf7RJ4WUxN0mb4ctkmmrqDMvKpRfGM";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTU1N2ZjNzFmODMyMTAwNTAyMDQxOGQiLCJjb21wYW55TmFtZSI6InZpc21hIiwiaWF0IjoxNTk1OTQ0Mjk5LCJleHAiOjE1OTcxNTM4OTl9.Vvx5lXOAuOqAN-3yH7TCq1QkRGhaRDN6mgdeDUu05NM";
const client = NettuClient.create(token);

const init = async () => {
//   const { userId } = await client.users.createUser({
//     name: "Hello SDK",
//   });
// const userId = "5e557fc71f8321005020418d";
//   const { accessToken } = await client.users.createToken(userId);
//   console.log({
//     userId,
//     accessToken,
//   });
};

const init2 = async () => {
  const data = await client.bookings.listFinished();
  console.log(data);
  const employeesFilter = {
    employeesUserId: [],
    tag: "Timeplan"
  }
  const req = {
    timestampUTC: (new Date().getTime()+1000*60*60*24),
    comment: "Først fra sdk",
    duration: 45
  }
  const t = await client.bookings.createRequest(employeesFilter, req);
  console.log('t');
  console.log(t);
};

init2();
