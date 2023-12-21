export const layout = "layouts/archive.vto";
export const title = "Archive";

export default function* ({ search, paginate }) {
  const posts = search.pages("type=posts", "date=desc");
  const paginated = paginate(posts, { url, size: 9 });

  const pages = paginated.map((data) =>
    data.pagination.page === 1 ? { ...data, visible: false, order: 1 } : data
  );

  for (const data of pages) yield data;
}

function url(n) {
  if (n === 1) return "/weblog/archive/";
  return `/weblog/archive/${n}/`;
}
