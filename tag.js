export const layout = "layouts/tag.vto";

export default function* ({ search }) {
  for (const tag of search.tags()) {
    yield {
      url: `/tags/${tag}/`,
      title: `${tag}`,
      type: "tag",
      tag,
    };
  }
}