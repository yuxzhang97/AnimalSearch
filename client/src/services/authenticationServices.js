import { gql } from "@apollo/client";

export const SIGN_UP_GOOGLE = gql `
  mutation($accessToken:String!) {
        signUpGoogle(accessToken:$accessToken) {
           accessToken,
           refreshToken
        }
    }
`;