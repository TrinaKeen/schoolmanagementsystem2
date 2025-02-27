// Use the steps from neon forum and ask help to other groups for some info connecting the neondatabase
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;



