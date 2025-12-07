import { Hono } from "hono";
import { FlagsSDK } from "../../../dist";

const app = new Hono();

const sdk = new FlagsSDK({
  baseURL: "https://flags-api.basestack.co/v1",
  projectKey: "cmi66kums00020mpq5rw7ezx9",
  environmentKey: "cmi66kumz00040mpqps87kxn8",
});

app.get("/", async (c) => {
  try {
    const flag = await sdk.getFlag("header");
    return c.json({
      slug: flag.slug,
      enabled: flag.enabled,
      payload: flag.payload,
    });
  } catch (error) {
    return c.json(
      {
        error: true,
        message: (error as Error).message,
      },
      500,
    );
  }
});

export default {
  fetch: app.fetch,
  port: 8080,
};
