import {
    RefreshMutation,
    RefreshMutationVariables,
    RefreshDocument,
  } from "../../graphql/generated";
  import { readAccessToken, setAccessToken } from "./helpers";
  
  export default async function refreshAccessToken() {
    // 1. Get our current refresh token from local storage
    const currentRefreshToken = readAccessToken()?.refreshToken;
  
    if (!currentRefreshToken) return null;
  
    async function fetchData<TData, TVariables>(
      query: string,
      variables?: TVariables,
      options?: RequestInit["headers"]
    ):Promise<TData>{
        const res = await fetch("https://api.lens.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "applciation/json",
                //normally request a refresh token which causes the infinate loop
                ...options,
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });
        const json = await res.json();

        if(json.error) {
            const { message} = json.error[0] || {};
            throw new Error(message || "Error..");
        }

        return json.data;
    }

    const result = await fetchData<
    RefreshMutation,
    RefreshMutationVariables
    >(RefreshDocument, {
        request: {
            refreshToken: currentRefreshToken,
        },
    });

    const {refresh: {accessToken, refreshToken: newRefreshToken}} = result

    setAccessToken(accessToken, newRefreshToken);

    return accessToken as string;
}