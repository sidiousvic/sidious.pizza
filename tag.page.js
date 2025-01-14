export const layout = "layouts/tag.vto";

export default function* ({ search }) {
  for (const tag of search.values("tags")) {
    yield {
      url: `/tags/${tag}/`,
      title: `${tag}`,
      type: "tag",
      tag,
    };
  }
}
