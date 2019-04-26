import { credentials } from "../../credentials/test-credentials";
import { init } from "../init";
import { addRecord, updateRecord } from "../tables";

const CUSTOM_TABLE = "OfferAssignments";
const RECORD_ID = "20";

let mocked: jest.Mock<any, any>;

jest.mock("node-fetch", () => {
  mocked = jest.fn();
  return {
    default: mocked
      .mockImplementation(() => ({
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
      .mockImplementationOnce(() => ({ ok: false, statusText: "Unauthorized" }))
      .mockImplementationOnce(() => ({ ok: false, statusText: "Unauthorized" }))
  };
});

describe("tables", () => {
  it("handles unauthorized updates", async () => {
    await expect(updateRecord(CUSTOM_TABLE, RECORD_ID, { assignmentReference: "newReference" })).rejects.toThrow(
      "Unauthorized"
    );
  });
  it("handles unauthorized creates", async () => {
    await expect(
      addRecord(CUSTOM_TABLE, {
        synchronized: true,
        offerReference: "springoffer",
        profileReference: "alaindresse@gmail.com"
      })
    ).rejects.toThrow("Unauthorized");
  });
  it("updates record", async () => {
    init(credentials);
    await updateRecord(CUSTOM_TABLE, RECORD_ID, { assignmentReference: "newReference" });
    const calls = mocked.mock.calls;
    const [url, options] = calls[calls.length - 1];
    expect(url).toBe(
      "https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/OfferAssignments/record/20"
    );
    expect(options).toMatchObject({
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: '{"properties":[{"name":"assignmentReference","value":"newReference"}]}'
    });
  });

  it("adds new record", async () => {
    init(credentials);
    await addRecord(CUSTOM_TABLE, {
      synchronized: true,
      offerReference: "springoffer",
      profileReference: "alaindresse@gmail.com"
    });
    const calls = mocked.mock.calls;
    const [url, options] = calls[calls.length - 1];
    expect(url).toBe(
      "https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/OfferAssignments/record"
    );
    expect(options).toMatchObject({
      body:
        '{"properties":[{"name":"synchronized","value":true},{"name":"offerReference","value":"springoffer"},{"name":"profileReference","value":"alaindresse@gmail.com"}]}',
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
  });
});
