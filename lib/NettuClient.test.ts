import NettuClient from "./NettuClient";

test('Client creation', () => {
    const accessToken = "dasfsafasfsa";
    const client = NettuClient.new(accessToken);
    expect(client).toBeDefined();
  });