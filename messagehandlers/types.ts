
export type GiphyImage = {
  url: string;
  width: string;
  height: string;
  size: string;
  mp4: string;
  mp4_size: string;
  webp: string;
  webp_size: string;
};

export type GiphySingleImageResponse = {
  data: {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: "g" | "pg" | "pg-13" | "r";
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    // some more unused
    images?: {
      fixed_height: GiphyImage;
    };
  };
};
export type GiphyMultipleImagesResponse = {
  data: Array<GiphySingleImageResponse["data"]>;
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
};