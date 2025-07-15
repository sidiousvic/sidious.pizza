import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import date from "lume/plugins/date.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import eta from "lume/plugins/eta.ts";
import extract_date from "lume/plugins/extract_date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import base_path from "lume/plugins/base_path.ts";
import check_urls from "lume/plugins/check_urls.ts";
import brotli from "lume/plugins/brotli.ts";
import vento from "lume/plugins/vento.ts";
import markdown from "lume/plugins/markdown.ts";

const site = lume();

site.copy("_includes/fonts", "fonts");
site.copy("_includes/images", "images");

site.use(markdown());
site.use(vento());
site.use(attributes());
site.use(date());
site.use(code_highlight());
site.use(eta());
site.use(extract_date());
site.use(esbuild());
site.use(base_path());
site.use(check_urls());
site.use(brotli());

export default site;
