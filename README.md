# Running locally

1. Create a `.env.local` file with the following contents

```
NEXT_PUBLIC_ICY_API_KEY={apikey}
```

2. Do `yarn install` or `npm install`
3. Do `yarn dev` or `npm run dev`
4. Navigate to http://localhost:3000

## Assignment notes

- There are two pages: one that fetches the data on the client side using a custom hook, and one that fetches the data on the server side and renders the page using SSR. There are links on either page to go to one or the other
- I don't have API keys for Infura or Alchemy, so the only connector that is supported is the Coinbase Wallet connector

# Tech Questions and Answers
## Database

I like to start from the bottom up and define what the data model looks like. This will help give a vision for what the rest of the application is going to look like, because we're mainly focusing on serving data to a client.

If the data has many different types or entities that are going to be related to each other, a SQL database might be a better choice. SQL:

- has a defined query language and is easy to write simple queries for
- simplifies some use cases like reporting on data-warehouse-esque data
- is fairly consistent all implementations (Microsoft SQL Server, PostgreSQL, MySQL, etc)

If we don't really know the entirety of the data structure yet (or we know that the data we're serving doesn't have a well-formed structure), a NoSQL database is likely the better candidate. NoSQL databases (spefically document databases):

- are quick to develop against since you don't need a defined schema, especially with JavaScript since they mimic a JSON-like data structure
- handle unstructured data much better than SQL
- is easier to scale since it doesn't have as rigid of requirements for scalability as SQL

Both have their cons, too. SQL is difficult to scale since all of the data typically lives on one system, meaning the server that serves the data from a SQL instance also has to be powerful enough to serve the data that lives there to any number of requests. Horizontal scaling can be done with SQL, but it is very difficult.

NoSQL isn't as mature as SQL. That means some implementations could have less support. There are also inconsistencies across implementations, like a document database being different from a key-value store; while they're both considered NoSQL database types, they are very different, making interoperability between the two difficult.

**Conclusion:** I would choose a document DB NoSQL database given the requirement to allow thousands of requests per second for this data. My implementation of choice would be MongoDB due to how mature it is and how much support it has in the developer world.

## API

I would use an Express.js application, mainly because that is what I am comfortable with when working with a document database. This application would expose a GraphQL API that clients can use to query their data in whatever shape they prefer. REST is an option, but assuming the data is going to be relatively unstructured, GraphQL can be a better fit so we don't have to define a schema for every shape that a customer might want.

## Authentication

I'll be very honest here: I understand authentication and authorization concepts enough to be able to talk through them, but implementing them is a different story. Based on my inexperience with implementing custom auth mechanisms and the importance of auth working correctly/securely, I would heavily rely on a well-recognized library for handling auth such as Auth0.

The API would utilize OAuth2 provided by Auth0. If cost is a concern, I would investigate a hand-rolled solution using a well-known library like Passport.js, but I would lean heavily on my peers and teammates to make sure I am following best practices.

## Scaling

Specifically talking about the application and the code itself, I would look at implementing some practices like:

- caching request/responses. If the data doesn't change very often, a simple caching implementation can provide significant lift. If it does change often, I'd have to weigh the increase in complexity of properly handling cache invalidation with the benefit the application would get from being able to cache data. If it changes frequently enough, caching could potentially not offer nearly as much lift as what it seems at first glance.
- use profiling tools to help identify performance problems in the code.
- auditing indexes on the database. Indexes are an easy way to make sure queries are as performant as possible, and if the indexes haven't been revisited since the application was created, there is likely room for improvement.

At some point, the ability to increase performance of an application by making changes to the code and introducing different performance improvement patterns becomes impossible. If the application gets to that point, we would look at horizontal and vertical scaling. I would use load testing tools like k6 or similar to identify the point at which the application/server reaches certain points that could cause degradation, and work with the tools available to make sure we have enough infrastructure to support the expected number of requests.

## Real time updates

I'll mention two approaches here: one that I have implemented in production, and one that I have only done a proof-of-concept with but have read a lot about.

The one I've implemented in production is using a WebSocket provider like SignalR to publish events when changes to certain entities occur. Clients would be able to implement their WebSocket client of choice, and subscribe to the events that would either carry the changed data or a smaller subset of it (like an ID) which they could then use to trigger a refresh of their client-side data.

The one I've done a proof-of-concept on is the concept of subscriptions in GraphQL. The concept is really the same as the one I outlined above - libraries like `apollo-server` allow for publishing events to clients that have subscription queries. The subscription queries are registered with the GraphQL server and clients will receive real-time updates when a mutation occurs based on the parameters of the subscription.
