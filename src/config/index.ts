require("dotenv").config();

if (!process.env["ACCOUNT_ID"] || !process.env["PK"]) {
  throw new Error("ACCOUNT ID or PRIVATE KEY not included in env variable");
}
export const config = {
  HEDARA: {
    account_id: process.env["ACCOUNT_ID"],
    private_key: process.env["PK"],
  },
};
