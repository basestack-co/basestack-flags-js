import { describe, expect, it, vi } from "vitest";
import { type Flag, FlagsSDK } from "../src";

const baseURL = "https://example.basestack.test";
const projectKey = "project-key";
const environmentKey = "environment-key";

const mockFlag: Flag = {
  slug: "header",
  enabled: true,
  payload: { variant: "a" },
  description: "Header experiment",
  createdAt: new Date("2024-01-01T00:00:00.000Z"),
  updatedAt: new Date("2024-01-01T00:05:00.000Z"),
  expiredAt: null,
};

const createResponse = <T>(body: T, ok = true): Response =>
  ({
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
  }) as Response;

const buildSDK = <T>(responseBody: T) => {
  const fetchSpy = vi.fn(async () => createResponse(responseBody));
  const sdk = new FlagsSDK({
    projectKey,
    environmentKey,
    baseURL,
    fetchImpl: fetchSpy as unknown as typeof fetch,
    cache: { enabled: true, ttl: 10_000, maxSize: 10 },
  });

  return { sdk, fetchSpy };
};

describe("FlagsSDK", () => {
  it("fetches a flag with the required headers", async () => {
    const { sdk, fetchSpy } = buildSDK(mockFlag);

    const flag = await sdk.getFlag("header");

    expect(flag.slug).toBe("header");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(
      `${baseURL}/flags/header`,
      expect.objectContaining({
        headers: expect.objectContaining({
          "x-project-key": projectKey,
          "x-environment-key": environmentKey,
          "Content-Type": "application/json",
        }),
      }),
    );
  });

  it("returns cached values for repeated requests", async () => {
    const { sdk, fetchSpy } = buildSDK(mockFlag);

    await sdk.getFlag("header");
    await sdk.getFlag("header");

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("clears entries for a specific flag", async () => {
    const { sdk, fetchSpy } = buildSDK(mockFlag);

    await sdk.getFlag("header");
    sdk.clearFlagCache("header");
    await sdk.getFlag("header");

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("retrieves the full flag list", async () => {
    const flagsResponse = { flags: [mockFlag] };
    const { sdk } = buildSDK(flagsResponse);

    const { flags } = await sdk.getAllFlags();

    expect(flags).toHaveLength(1);
    expect(flags[0].slug).toBe("header");
  });
});
