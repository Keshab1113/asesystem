import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  port: Number.parseInt(process.env.DB_PORT || "3306"),
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
}

export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results as T[];
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function executeTransaction(
  queries: { query: string; params: any[] }[]
) {
  const connection = await getConnection();
  try {
    await connection.beginTransaction();
    const results = [];
    for (const { query, params } of queries) {
      const [result] = await connection.execute(query, params);
      results.push(result);
    }
    await connection.commit();
    return results;
  } catch (error) {
    await connection.rollback();
    console.error("Transaction error:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function closePool() {
  await pool.end();
}

export default pool;
