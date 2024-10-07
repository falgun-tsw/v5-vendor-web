import _get from "lodash/get";

const commonParsers = {};

commonParsers.blogs = (res) => {
  if (res && res.response) {
    res = res.response;
  }
  if (!res) {
    return [];
  }
  return res.map((e) => ({
    imageUrl: _get(e, "image", null),
    title: _get(e, "title", null),
    description: _get(e, "description", ""),
    readMoreLink: _get(e, "link", ""),
    author: _get(e, "author", 1),
  }));
};

export { commonParsers };
