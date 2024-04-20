# sm-games-fe

# Setup

1. Get frontend going: `pnpm run dev`
1. In another terminal tab in this `sm-games-fe` directory, start the postgres server: `docker compose up`
1. In yet another terminal tab, run the backend (for websockets):
   a. `cd ../sm-games-be`
   b. `pnpm run dev`

## Accessing the database locally

While the database is running, in another terminal tab:

1. Run `docker exec -it sm-games-fe-postgres-1 /bin/bash`
1. Run `psql -U postgres`
1. Connect to the database: `\c smgames`
