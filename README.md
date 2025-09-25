# Svelte Ordering

Svelte Ordering is a simple web order system.

![screenshot](/readme/screen.png)

Tiny Ordering is build by Sveltekit, drizzle ORM and PostgreSQL.<br>
We Implemnted few functions. Add and remove by cart and show order histories.

## How to use.

Set up Database with docker.

```
cd docker
docker build -t <image_name> .
docker run --name <container_name> -p 5432:5432 <image_name>
```

Install dependencies.

```
bun install
```

Update database with drizzle.

```
bun db:push
```

Run app.

```
bun dev
```
