# Simple Express Application using PostgreSQL
- This is a bare-bones application with literally _zero_ styling - it was made 
as an educational tool.

## Getting Started
- run `npm install` to install all of the Application's dependencies
- I used [PG Promise](https://github.com/vitaly-t/pg-promise) for this example. 
My configuration for my database can be found in `db/db.js` and is as follows:

```javascript
const pgConfig = {  host: process.env.PG_HOST,
                    port: process.env.PG_PORT,
                    database: 'express_pg',
                    user:process.env.PG_USER,
                    password: process.env.PG_PASSWORD };
```
- You will need to create a database called `express_pg` (or whatever you want
really, just make sure the pgConfig reflects it).
- run the schema file with `psql -d express_pg -f db/schema.sql`
- run the seeds file with `psql -d express_pg -f db/seeds.sql`
- In order to connect your database to your app, you should replace the `host`,
`post`, `user`, and `password` with your own info.
  * Default port for postgres is usually `5432` or `5433` if the former is 
  already being used.
- Run `npm start`
- Enjoy