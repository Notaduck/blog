jest.mock("@sendgrid/mail", () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

const sendgrid = require("@sendgrid/mail") as {
  setApiKey: jest.Mock;
  send: jest.Mock;
};

type MockRequest = {
  method?: string;
  body?: Record<string, string>;
};

type MockResponse = {
  status: jest.Mock;
  json: jest.Mock;
};

const createMockResponse = (): MockResponse => {
  const res: Partial<MockResponse> = {};
  res.status = jest.fn(() => res as MockResponse);
  res.json = jest.fn(() => res as MockResponse);
  return res as MockResponse;
};

describe("sendgrid handler", () => {
  const loadHandler = () => {
    let handlerModule: (req: MockRequest, res: MockResponse) => Promise<void> | void;
    jest.isolateModules(() => {
      handlerModule = require("../src/api/sendgrid");
    });
    return handlerModule!;
  };

  beforeEach(() => {
    sendgrid.send.mockReset();
    sendgrid.setApiKey.mockReset();
    process.env.SENDGRID_API_KEY = "test-api-key";
    process.env.SENDGRID_AUTHORIZED_EMAIL = "owner@example.com";
  });

  it("initializes sendgrid with the API key", () => {
    loadHandler();
    expect(sendgrid.setApiKey).toHaveBeenCalledWith("test-api-key");
  });

  it("responds to non-POST requests with a helpful message", async () => {
    const req: MockRequest = { method: "GET" };
    const res = createMockResponse();

    sendgrid.send.mockResolvedValueOnce(undefined);

    const handler = loadHandler();
    await handler(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Try a POST!" });
  });

  it("sends emails using the provided payload on POST", async () => {
    const req: MockRequest = {
      method: "POST",
      body: {
        subject: "Hello",
        text: "Greetings ",
        from: "visitor@example.com",
      },
    };
    const res = createMockResponse();

    sendgrid.send.mockResolvedValueOnce(undefined);

    const handler = loadHandler();
    await handler(req, res);

    expect(sendgrid.send).toHaveBeenCalledWith({
      from: "owner@example.com",
      to: "owner@example.com",
      subject: "Hello",
      text: "Greetings visitor@example.com",
      html: "Greetings ",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "I will send email",
    });
  });

  it("returns a server error when sendgrid fails", async () => {
    const req: MockRequest = {
      method: "POST",
      body: {
        subject: "Broken",
        text: "Failure",
        from: "visitor@example.com",
      },
    };
    const res = createMockResponse();
    const error = { response: { body: "boom" } };

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    sendgrid.send.mockImplementationOnce(() => Promise.reject(error));

    const handler = loadHandler();
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: error.response,
    });

    consoleErrorSpy.mockRestore();
  });
});
