import { FlagsSDK } from "../../../dist";
import { Hono } from "hono";

const app = new Hono();

const sdk = new FlagsSDK({
  baseURL: "http://localhost:4000/v1",
  projectKey: "cmhj9vgjl000svj8oed92qi9u",
  environmentKey: "cmhj9vgjo000uvj8ogf2m2fug",
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
