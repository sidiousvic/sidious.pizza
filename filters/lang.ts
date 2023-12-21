const lang = (
  body: string,
  lang: "jp" | "en",
  bodyLines = [""],
  langIndex = { start: 0, end: 0 },
) => (
  (bodyLines = body.split("\n")),
    (langIndex = {
      start: bodyLines.indexOf(`<!-- ${lang} -->`),
      end: bodyLines.indexOf(`<!-- end${lang} -->`),
    }),
    bodyLines.slice(langIndex.start + 1, langIndex.end).join("\n")
);

export default lang;
