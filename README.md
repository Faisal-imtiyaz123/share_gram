This project uses  [React.js](https://react.dev) ( bootstrapped with `npm create vite@latest` ) for frontend and [trpc](https://trpc.io) for server.

## Getting Started

1. Setup the UI
2. Setup the Server



### Setup UI:
```bash
cd frontend //Go to frontend directory (Execute from share_gram directory)
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the frontend UI.

### Setup the server
```bash
cd server // Go to server directory (Execute from share_gram directory) 
```

```bash
npm run dev
```
This will setup the server at  [http://localhost:3000](http://localhost:3000)

## SECRETS
You will need the following [pusher](https://pusher.com) secrets:

`PUSHER_APP_ID `
`PUSHER_KEY `
`PUSHER_SECRET `
`PUSHER_CLUSTER `

The following [cloudinary](https://cloudinary.com) serctes:

`CLOUD_NAME`
`CLOUDINARY_API_KEY`
`UPLAOD_PRESET `

The following Database ( [mongodb](https://www.mongodb.com) ) url secret:

`DATABASE_URL`
## Learn More

To learn more about Next.js, take a look at the following resources:

- [React.js Documentation](https://react.dev/learn) - learn about React.js features .
- [Learn trpc](https://trpc.io) - docs to learn trpc.




