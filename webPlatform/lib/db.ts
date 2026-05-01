import { Pool } from "pg";  

// reuses open PostgreSQL connections across requests instead of opening a new one each time
const pool = new Pool({  
  connectionString: process.env.DATABASE_URL,  
});  
  
export default pool;