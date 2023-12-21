export function optimizePics9000(pages) {
  for (const page of pages) {
    const picToOptimizePattern = /<img [^>]*?\boptimize\b[^>]*?>/g;
    const picsToOptimize = page.content.match(picToOptimizePattern);
    if (picsToOptimize) {
      for (const picToOptimize of picsToOptimize) {
        const matchResultFallback = ["", "", ""];

        const altPattern = /(alt\=)"(.*?)"/;
        const [, , alt] =
          picToOptimize.match(altPattern) ?? matchResultFallback;
        const srcPattern = /(src\=)"(.*?)"/;
        const [, , src] =
          picToOptimize.match(srcPattern) ?? matchResultFallback;
        const captionPattern = /(caption\=)"(.*?)"/;
        const [, , caption] =
          picToOptimize.match(captionPattern) || matchResultFallback;
        const heightPattern = /(height\=)"(.*?)"/;
        const [, , height] =
          picToOptimize.match(heightPattern) ?? matchResultFallback;
        const widthPattern = /(width\=)"(.*?)"/;
        const [, , width] =
          picToOptimize.match(widthPattern) ?? matchResultFallback;
        const priorityPattern = /(priority\=)"(.*?)"/;
        const [, , priority] =
          picToOptimize.match(priorityPattern) ?? matchResultFallback;

        if (!alt)
          throw new Error(`No alt attribute found for ${picToOptimize.input}`);
        if (!src)
          throw new Error(`No src attribute found for ${picToOptimize.input}`);

        const optimizedPicHTML = `
<figure>
  <picture>
  ${priority === "high" ? `<link rel="preload" as="image" href="${src}"/>` : ""}
    <img 
        fetchpriority="${priority === "high" ? "high" : "low"}" 
        ${height ? 'height="${height}"' : ""} 
        ${width ? 'width="${width}"' : ""}
        alt="${alt}" 
        src="${src}"
    />
  </picture>
  <figcaption>${caption}</figcaption>
</figure>
`;

        page.content = page.content.replace(picToOptimize, optimizedPicHTML);
      }
    }
  }
}
