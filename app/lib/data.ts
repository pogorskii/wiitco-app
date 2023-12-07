"use server";

export async function fetchTwitchToken() {
  try {
    const data = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_API_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );
    const result = await data.json();
    console.log(result);
  } catch (error) {
    console.error("Couldn't fetch Twitch (IGDB) API token: ", error);
  }
}
