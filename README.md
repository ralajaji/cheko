## Get it running (30-second version)

**1. Get yourself a Mapbox token**

Grab a free public token from [mapbox.com](https://account.mapbox.com/access-tokens/) (starts with `pk.`).

**2. Feed it to the frontend**

```bash
cp frontend/.env.example frontend/.env
```

Open `frontend/.env` and paste your token in:

```
VITE_MAPBOX_ACCESS_TOKEN=pk.your_actual_token_here
```

**3. Let Docker do the rest**

```bash
docker compose up --build
```

That's genuinely it. No step 4.

## Where things live once it's up

| Service  | URL                            |
|----------|---------------------------------|
| Frontend | http://localhost:5173          |
| Backend  | http://localhost:8080          |
| Postgres | localhost:5432 (`cheko`/`cheko`) |