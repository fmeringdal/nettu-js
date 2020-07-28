import NettuClient from "./NettuClient";

test('Client creation', () => {
    const accessToken = "dasfsafasfsa";
    const client = NettuClient.create(accessToken);
    expect(client).toBeDefined();
  });