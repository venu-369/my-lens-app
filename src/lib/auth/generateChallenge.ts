import { ChallengeDocument, ChallengeQuery, ChallengeQueryVariables } from "../../graphql/generated";
import { fetcher } from "../../graphql/auth-fetcher";


export default async function generateChallenge(address: string) {
    return await fetcher<ChallengeQuery, ChallengeQueryVariables>(
        ChallengeDocument,
        {
            request: {
                address,
            }
        }
    )()
}
