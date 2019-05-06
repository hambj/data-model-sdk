import { diff } from "deep-diff";
import { init } from "../init";
import { createProfile, deleteProfile, getProfile, updateProfile } from "../profiles";
import { addRecord, deleteRecord, getRecord, updateRecord } from "../tables";

init({
  user: process.env.WSUSER || "licence/WebService_user",
  password: process.env.WSPASSWORD || "password",
  entity: "product",
  env: "test"
});

async function demoProfiles() {
  const newProfile = { firstName: "Alain", lastName: "Dresse", emailAddress: "ziki@example.com" };

  const { profileId } = await createProfile("Clients", { profile: newProfile });
  const { profile: initialProfile } = await getProfile("Clients", profileId);
  await updateProfile("Clients", profileId, { profile: { firstName: "Ziki" } });
  const { profile: updatedProfile } = await getProfile("Clients", profileId);
  await deleteProfile("Clients", profileId);

  console.log({
    initialProfile,
    updatedProfile,
    diff: JSON.stringify(diff(initialProfile, updatedProfile), undefined, " ")
  });
}

async function demoTables() {
  const tableName = "OfferAssignments";
  const newRecord = { synchronized: false, offerReference: "springoffer", profileReference: "alaindresse@example.com" };

  const { businessKey: id } = await addRecord(tableName, newRecord);
  const initialRecord = await getRecord(tableName, id);
  await updateRecord(tableName, id, { assignmentReference: "aaa" });
  const updatedRecord = await getRecord(tableName, id);
  await deleteRecord(tableName, id);

  console.log({
    initialRecord,
    updatedRecord,
    diff: JSON.stringify(diff(initialRecord, updatedRecord), undefined, " ")
  });
}

demoProfiles();
demoTables();
