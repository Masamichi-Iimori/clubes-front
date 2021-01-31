export default interface Tweet {
  tweet_id: number,
  full_text: string,
  tweeted_at: number,
  is_club: boolean,
  positions: string[],
  media_url: string[],
  user: User
}

interface User {
  id: number,
  name: string,
  screen_name: string
}
