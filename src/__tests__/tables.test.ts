import { init } from "../init";
import { addRecord, deleteRecord, getRecord, increment, updateRecord } from "../tables";
import { checkLastCall, credentials } from "./helpers";

const CUSTOM_TABLE = "OfferAssignments";
const RECORD_ID = "20";

let mocked: jest.Mock<any, any>;

const dummyRecordProperties = {
  properties: [
    { name: "synchronized", value: true },
    { name: "offerReference", value: "springoffer" },
    { name: "profileReference", value: "alaindresse@gmail.com" }
  ]
};

const dummyRecord = {
  synchronized: true,
  offerReference: "springoffer",
  profileReference: "alaindresse@gmail.com"
};

jest.mock("node-fetch", () => {
  mocked = jest.fn();
  return { default: mocked.mockImplementation(() => ({ ok: true, json: () => ({}) })) };
});

describe("tables", () => {
  const expectFetch = checkLastCall(mocked);
  init(credentials);

  it("fetches record", async () => {
    mocked.mockImplementationOnce(() => ({ ok: true, json: () => dummyRecordProperties }));
    const record = await getRecord(CUSTOM_TABLE, RECORD_ID);
    expectFetch({
      url: `https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/${CUSTOM_TABLE}/record/${RECORD_ID}`,
      options: { method: "GET" }
    });
    expect(record).toMatchObject(dummyRecord);
  });

  it("updates record", async () => {
    await updateRecord(CUSTOM_TABLE, RECORD_ID, { assignmentReference: "newReference" });
    expectFetch({
      url: `https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/${CUSTOM_TABLE}/record/${RECORD_ID}`,
      options: {
        method: "PUT",
        body: '{"properties":[{"name":"assignmentReference","value":"newReference"}]}'
      }
    });
  });

  it("adds new record", async () => {
    await addRecord(CUSTOM_TABLE, dummyRecord);

    expectFetch({
      url: `https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/${CUSTOM_TABLE}/record`,
      options: {
        method: "POST",
        body: JSON.stringify(dummyRecordProperties)
      }
    });
  });

  it("deletes record", async () => {
    mocked.mockImplementationOnce(() => ({ ok: true, text: () => "" }));
    await deleteRecord(CUSTOM_TABLE, RECORD_ID);
    expectFetch({
      url: `https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/${CUSTOM_TABLE}/record/${RECORD_ID}`,
      options: { method: "DELETE" }
    });
  });

  it("increments record", async () => {
    mocked.mockImplementationOnce(() => ({ ok: true, json: () => ({ properties: [{ name: "value", value: 1 }] }) }));
    await increment(CUSTOM_TABLE, RECORD_ID, "value", 1);
    expectFetch({
      url: `https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/${CUSTOM_TABLE}/record/${RECORD_ID}`,
      options: {
        method: "PUT",
        body: JSON.stringify({ properties: [{ name: "value", value: 2 }] })
      }
    });
  });

  it("increments undefined field in record", async () => {
    mocked.mockImplementationOnce(() => ({ ok: true, json: () => ({ properties: [{ name: "value", value: 1 }] }) }));
    await increment(CUSTOM_TABLE, RECORD_ID, "otherValue", 1);
    expectFetch({
      url: `https://test.actito.be/ActitoWebServices/ws/v4/entity/product/customTable/${CUSTOM_TABLE}/record/${RECORD_ID}`,
      options: {
        method: "PUT",
        body: JSON.stringify({ properties: [{ name: "otherValue", value: 1 }] })
      }
    });
  });
});
