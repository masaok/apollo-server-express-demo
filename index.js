const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `
  console.log('TYPE DEFS:')
  console.log(typeDefs)

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  }
  console.log('RESOLVERS:')
  console.log(resolvers)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })

  await new Promise(resolve => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

startApolloServer()
