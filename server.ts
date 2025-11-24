import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";
const TTS_MODEL = "gpt-4o-mini-tts";
const TTS_VOICE = "ash";
const TTS_VIBE = "Bedtime Story"
const SITE_ROOT = "_site";
const PORT = (() => {
  const argPort = Deno.args.find((a) => a.startsWith("--port="));
  if (argPort) return Number(argPort.split("=")[1]) || 4000;
  return Number(Deno.env.get("PORT") ?? "4000");
})();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function handleTTS(req: Request): Promise<Response> {
  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing OPENAI_API_KEY on server" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
    );
  }

  let payload: { input?: string; model?: string; voice?: string };
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const text = (payload.input ?? "").toString().trim();
  const model = payload.model || TTS_MODEL;
  const voice = payload.voice || TTS_VOICE;

  if (!text) {
    return new Response(JSON.stringify({ error: "No text provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const upstream = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      voice,
      input: text.slice(0, 4000),
      format: "mp3",
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    return new Response(
      JSON.stringify({ error: errText || "OpenAI TTS failed" }),
      {
        status: upstream.status,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }

  const headers = new Headers({ ...corsHeaders, "Content-Type": "audio/mpeg" });
  return new Response(upstream.body, { status: 200, headers });
}

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/tts") {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Use POST for /api/tts" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    return await handleTTS(req);
  }

  if (req.method === "GET" || req.method === "HEAD") {
    return serveDir(req, { fsRoot: SITE_ROOT, quiet: true });
  }

  return new Response("Not found", { status: 404 });
});

console.log(`Server running at http://localhost:${PORT}`);
