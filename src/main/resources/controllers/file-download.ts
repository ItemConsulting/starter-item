import { getContent, attachmentUrl, type Content } from "/lib/xp/portal";

export function get(): XP.Response {
  const content = getContent<Content<Media>>();

  if (content) {
    return {
      redirect: attachmentUrl({
        path: content._path,
        name: content.data.media.attachment,
        download: true,
      }),
    };
  } else {
    return {
      status: 404,
    };
  }
}

interface Media {
  media: {
    attachment: string;
  };
}
