export interface LiveStreamer {
  id: string;
  name: string;
  category: string;
  title: string;
  started: string;
  viewers: number;
}

export interface StreamerResult {
  id: string;
  name: string;
  imgUrl: string;
}

export interface ChannelResponse {
  data: Channel[];

  pagination: {
    cursor: string;
  };
}

export interface Channel {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  tags_ids: string[];
  thumbnail_url: string;
  title: string;
  started_at: string;
}

export interface StreamResponse {
  data: Stream[];
  pagination: {
    cursor: string;
  };
}

export interface Stream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: boolean;
}

export interface Notif {
  name: string;
  live: boolean;
}

export interface Pages {
  mainPage: boolean;
  notificationsPage: boolean;
  tokenPage: boolean;
  versionPage: boolean;
}
