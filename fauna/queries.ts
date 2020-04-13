import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import fetch from "cross-fetch";
import { Wisdom } from "./types";

const faunaSecret = process.env.FAUNA_KEY;

const client = new ApolloClient({
  fetch,
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    Authorization: `Bearer ${faunaSecret}`
  }
});

export async function GetAllWisdoms() {
  var queryResult = await client.query<{ allWisdoms: { data: Wisdom[] } }>({
    query: gql`
      query getAllWisdoms {
        allWisdoms(_size: 1000000) {
          data {
            author
            text
          }
        }
      }
    `
  });
  console.log(queryResult);
  console.log(queryResult.data.allWisdoms);
  return queryResult.data.allWisdoms.data;
}
