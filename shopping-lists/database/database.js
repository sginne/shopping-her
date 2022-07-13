import { Pool,Client } from "https://deno.land/x/postgres@v0.14.3/mod.ts";
//postgres://hkizgurt:OcVD5SPs4DCmT6S6QYiyi89uFcCSovRL@abul.db.elephantsql.com/hkizgurt
var options={
  type: "postgres",
  port: 5432,
  database: "hkizgurt",
  hostname: "abul.db.elephantsql.com",
  username: "hkizgurt",
  user: "hkizgurt",
  password: "OcVD5SPs4DCmT6S6QYiyi89uFcCSovRL",
}

const CONCURRENT_CONNECTIONS = 2;
//const connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client=new Client(options);

  try {

    const result = await client.queryObject(query, ...args);

    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.end();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
