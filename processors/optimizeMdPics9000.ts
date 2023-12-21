export function optimizeMdPics9000(pages) {
  for (const page of pages) {
    const mdPicMatcher = /@\[.*\]\(.*\)\(.*\)/g;
    // console.log(page.content.match(mdPicMatcher));
  }
}
