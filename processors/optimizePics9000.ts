export function optimizePics9000(pages) {
  for (const page of pages) {
    const picToOptimizePattern = /@optimizedPic\&lt\;.*\&gt\;/g;
    const picsToOptimize = page.content.match(picToOptimizePattern);
    if (picsToOptimize) {
      for (const picToOptimize of picsToOptimize) {
        const altPattern = /(alt\=)"(.*?)"/;
        const [, , alt] = picToOptimize.match(altPattern);
        const srcPattern = /(src\=)"(.*?)"/;
        const [, , src] = picToOptimize.match(srcPattern);
        const heightPattern = /(height\=)([0-9]+)/;
        const [, , height] = picToOptimize.match(heightPattern);
        const priorityPattern = /(priority\=)"(.*?)"/;
        const [, , priority] = picToOptimize.match(priorityPattern);

        console.log({ alt, src, height, priority });

        const optimizedPicHTML = `
<figure>
  <picture>
  ${priority === "high" ? `<link rel="preload" as="image" href="${src}"/>` : ""}
    <img 
        fetchpriority="${priority === "high" ? "high" : "low"}" 
        height="${height}" 
        alt="${alt}" 
        src="${src}"
    />
  </picture>
</figure>
    `;

        page.content = page.content.replace(picToOptimize, optimizedPicHTML);
      }
    }
  }
}
