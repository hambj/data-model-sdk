import { credentials } from "../../credentials/test-credentials";
import { getProfile } from "../profiles";
import { init } from "../init";

const PROFILE_TABLE = "Clients";

jest.mock("node-fetch", () => ({
  default: jest
    .fn()
    .mockImplementationOnce((url, { headers }) => {
      console.log(url, headers);
      return {
        ok: false,
        statusText: "Unauthorized"
      };
    })
    .mockImplementationOnce(() => ({
      ok: true,
      json: () => ({
        attributes: [{ name: "profileId", value: "7" }],
        subscriptions: [{ name: "Product Information", id: 2 }],
        segmentations: [
          { name: "NewsletterActivity", category: "Active" },
          { name: "Weatherafficionado", category: "considerably" }
        ]
      })
    }))
}));

describe("profile", () => {
  it("fails on non initialized", async () => {
    await expect(getProfile(PROFILE_TABLE, "7")).rejects.toThrow("Unauthorized");
  });

  it("gets profile", async () => {
    init(credentials);
    const { profile, subscriptions, segmentations } = await getProfile(PROFILE_TABLE, "7");
    expect(profile).toMatchObject({ profileId: "7" });
    expect(subscriptions).toBeInstanceOf(Array);
    expect(segmentations).toBeInstanceOf(Array);
    return profile;
  });
});
