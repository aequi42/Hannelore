import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import fetch from "cross-fetch";
import { Wisdom, RegisteredChat } from "./types";
import { Variables } from "../variables";

const faunaSecret = Variables.faunaKey;

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
  return queryResult.data.allWisdoms.data;
}
export async function GetAllRegisteredChats() {
  const queryResult = await client.query<{
    allRegisteredChats: { data: RegisteredChat[] };
  }>({
    query: gql`
      query chats {
        allRegisteredChats {
          data {
            chatId
            description
          }
        }
      }
    `
  });
  return queryResult.data.allRegisteredChats.data;
}
