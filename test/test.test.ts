import { NettuClient } from "../lib";

test('adds 1 + 2 to equal 3', () => {
    const accessToken = "dasfsafasfsa";
    const t = new NettuClient({
        accessToken
    });
    expect(t.tokens.getAccessToken()).toBe(accessToken);
  });