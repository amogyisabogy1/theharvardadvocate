/** @jsxImportSource theme-ui */
import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";

const pieceSx = {
  ".fontMod": { fontFamily: "Bernhard Gothic Medium, serif" },

  ".pieceHeader": {
    borderBottom: "1px solid #000",
    paddingBottom: "1em",
    marginBottom: "2em",
    padding: "2em 2vw 1em",
    maxWidth: "760px",
    margin: "0 auto",
  },
  ".pieceType": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#999",
    marginBottom: "0.5em",
  },
  ".pieceTitle": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "clamp(26px, 4vw, 40px)",
    lineHeight: 1.15,
    margin: "0 0 0.3em",
  },
  ".pieceAuthor": {
    fontFamily: "EB Garamond, serif",
    fontSize: "18px",
    fontStyle: "italic",
    color: "#444",
  },

  ".pieceBody": {
    maxWidth: "760px",
    margin: "0 auto",
    padding: "0 2vw 4em",
    fontFamily: "EB Garamond, serif",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#000",
    p: { marginBottom: "1.4em" },
  },

  ".artImageWrap": {
    maxWidth: "800px",
    margin: "0 auto 1.5em",
    padding: "0 2vw",
  },
  ".artImage": {
    width: "100%",
    display: "block",
    boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
  },
  ".artCaption": {
    fontFamily: "EB Garamond, serif",
    fontSize: "15px",
    fontStyle: "italic",
    color: "#666",
    marginTop: "0.5em",
    textAlign: "center",
  },

  ".backLink": {
    display: "inline-block",
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "14px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#000",
    textDecoration: "none",
    borderBottom: "1px solid #000",
    margin: "1.5em 2vw 0",
    paddingBottom: "1px",
  },
  ".backLink:hover": { opacity: 0.5 },
};

function resolveImage(source) {
  if (!source || source.trim() === "") return null;
  if (source.startsWith("./artimages/"))
    return `/womensissue/art/${source.replace("./artimages/", "")}`;
  const iconsMatch = source.match(/icons\/(.+)$/);
  if (iconsMatch) return `/womensissue/icons/${iconsMatch[1]}`;
  return null;
}

// Very lightweight markdown → HTML for the body content
function mdToHtml(text) {
  if (!text) return "";
  return text
    // Bold italic __*text*__
    .replace(/__\*(.+?)\*__/g, "<strong><em>$1</em></strong>")
    // Bold __text__
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    // Italic *text* (not **, not inside words)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    // Double newlines → paragraph break (if not already html)
    .replace(/\n\n+(?!<)/g, "<br /><br />")
    // Single newline → space (preserve <br /> that are already there)
    .replace(/(?<!>)\n(?!<)/g, " ");
}

export default function WomensPiece({ piece }) {
  if (!piece) return <div sx={pieceSx}><p style={{ padding: "2em" }}>Piece not found.</p></div>;

  const imgSrc = resolveImage(piece.source);
  const isArt = piece.category === "art";
  const htmlBody = mdToHtml(piece.body);

  return (
    <>
      <NextSeo
        title={`${piece.title} — The Women's Issue`}
        description={`${piece.type} by ${piece.author} — The Harvard Advocate Women's Issue`}
      />
      <div sx={pieceSx}>
        <Link href="/women" className="backLink">← Women&rsquo;s Issue</Link>

        <div className="pieceHeader">
          <div className="pieceType">{piece.type}</div>
          <h1 className="pieceTitle">{piece.title}</h1>
          <div className="pieceAuthor">
            {piece.type === "Interview"
              ? `In conversation with ${piece.author}`
              : piece.author}
          </div>
        </div>

        {isArt && imgSrc && (
          <div className="artImageWrap">
            <img src={imgSrc} alt={piece.title} className="artImage" />
            {piece.body && <p className="artCaption">{piece.body}</p>}
          </div>
        )}

        {!isArt && (
          <>
            {imgSrc && (
              <div style={{ maxWidth: "760px", margin: "0 auto 1.5em", padding: "0 2vw" }}>
                <img
                  src={imgSrc}
                  alt={piece.author}
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", display: "block" }}
                />
              </div>
            )}
            <div
              className="pieceBody"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />
          </>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const path = require("path");
  const fs = require("fs");

  const baseDir = path.join(
    process.cwd(), "src", "womensissue", "src", "pages", "pieces"
  );

  function parseFrontmatterPath(content) {
    const match = content.match(/^---[\s\S]*?path:\s*["']?([^\n"']+)["']?/);
    return match ? match[1].trim().replace(/^\//, "") : null;
  }

  function slugsFromDir(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
      .filter((f) => f.endsWith(".md"))
      .map((file) => {
        const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
        const slug = parseFrontmatterPath(raw) || file.replace(".md", "");
        return slug;
      });
  }

  const dirs = [
    path.join(baseDir, "art"),
    path.join(baseDir, "written", "fiction"),
    path.join(baseDir, "written", "poetry"),
    path.join(baseDir, "written", "personalessay"),
    path.join(baseDir, "interviews"),
  ];

  const slugs = dirs.flatMap(slugsFromDir);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const path = require("path");
  const fs = require("fs");

  const baseDir = path.join(
    process.cwd(), "src", "womensissue", "src", "pages", "pieces"
  );

  const categoryDirs = [
    { dirPath: path.join(baseDir, "art"), category: "art" },
    { dirPath: path.join(baseDir, "written", "fiction"), category: "fiction" },
    { dirPath: path.join(baseDir, "written", "poetry"), category: "poetry" },
    { dirPath: path.join(baseDir, "written", "personalessay"), category: "personalessay" },
    { dirPath: path.join(baseDir, "interviews"), category: "interviews" },
  ];

  function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
    const fm = {};
    match[1].split(/\r?\n/).forEach((line) => {
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1) return;
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
      fm[key] = val;
    });
    return fm;
  }

  function parseBody(content) {
    return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
  }

  for (const { dirPath, category } of categoryDirs) {
    if (!fs.existsSync(dirPath)) continue;
    for (const file of fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"))) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
      const fm = parseFrontmatter(raw);
      const slug = fm.path ? fm.path.replace(/^\//, "") : file.replace(".md", "");
      if (slug === params.slug) {
        return {
          props: {
            piece: {
              slug,
              title: fm.title || slug,
              author: fm.author || "",
              type: fm.type || "",
              source: fm.source || "",
              interview: fm.interview || "",
              category,
              body: parseBody(raw),
            },
          },
          revalidate: 86400,
        };
      }
    }
  }

  return { notFound: true };
}
