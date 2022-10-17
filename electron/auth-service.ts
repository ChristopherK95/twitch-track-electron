const redirectUri = "https://streamtrack-authentication.firebaseapp.com/";

let accessToken = "";

export function getAuthenticationURL(): string {
  return (
    "https://" +
    "id.twitch.tv/oauth2" +
    "/authorize?" +
    "client_id=" +
    "p4dvj9r4r5jnih8uq373imda1n2v0j" +
    "&redirect_uri=" +
    redirectUri +
    "&response_type=token" +
    "&scope=viewing_activity_read" +
    "&force_verify=true"
  );
}

export async function loadTokens(callbackURL: string): Promise<string> {
  callbackURL = callbackURL.replace("/#", "?");

  const params: string =
    new URL(callbackURL).searchParams.get("access_token") ?? "";

  accessToken = params;

  return accessToken;
}
