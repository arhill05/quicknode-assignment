# Running locally

Create a `.env.local` file with the following contents
```
NEXT_PUBLIC_ICY_API_KEY={apikey}
```

Do `yarn dev`

## Assignment notes
- There are two pages: one that fetches the data on the client side using a custom hook, and one that fetches the data on the server side and renders the page using SSR. There are links on either page to go to one or the other
- I don't have API keys for Infura or Alchemy, so the only connector that is supported is the Coinbase Wallet connector

# Tech Questions and Answers