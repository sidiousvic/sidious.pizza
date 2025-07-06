import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import date from "lume/plugins/date.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
// import decap_cms from "lume/plugins/decap_cms.ts";
import eta from "lume/plugins/eta.ts";
import extract_date from "lume/plugins/extract_date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import base_path from "lume/plugins/base_path.ts";
import check_urls from "lume/plugins/check_urls.ts";
import brotli from "lume/plugins/brotli.ts";

const site = lume();

site.use(attributes());
site.use(date());
site.use(code_highlight());
// site.use(decap_cms());
site.use(eta());
site.use(extract_date());
site.use(esbuild());
site.use(base_path());
site.use(check_urls());
site.use(brotli());

export default site;
