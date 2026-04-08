/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";

const womenSx = {
  ".fontMod": { fontFamily: "Bernhard Gothic Medium, serif" },

  ".heroSection": {
    position: "relative",
    overflow: "hidden",
    backgroundImage: "url('/womensissue/Background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "4em 2vw 3em",
    textAlign: "center",
    borderBottom: "1px solid rgba(0,0,0,0.15)",
  },
  ".heroOverlay": {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.72)",
  },
  ".heroInner": {
    position: "relative",
    zIndex: 1,
  },
  ".heroTitle": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "clamp(32px, 5vw, 60px)",
    letterSpacing: "0.02em",
    margin: 0,
    lineHeight: 1.1,
  },
  ".heroSub": {
    fontFamily: "EB Garamond, serif",
    fontSize: "18px",
    fontStyle: "italic",
    marginTop: "0.6em",
    opacity: 0.8,
  },
  ".heroCover": {
    width: "140px",
    margin: "1.5em auto 0",
    display: "block",
    boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
  },

  ".genreNav": {
    display: "flex",
    justifyContent: "center",
    gap: "0",
    borderBottom: "1px solid rgba(0,0,0,0.15)",
    overflowX: "auto",
    padding: "0 2vw",
  },
  ".genreBtn": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "14px 20px",
    cursor: "pointer",
    border: "none",
    borderBottom: "3px solid transparent",
    background: "none",
    color: "#777",
    whiteSpace: "nowrap",
    transition: "color 0.2s, border-color 0.2s",
  },
  ".genreBtnActive": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "14px 20px",
    cursor: "pointer",
    border: "none",
    borderBottom: "3px solid #000",
    background: "none",
    color: "#000",
    whiteSpace: "nowrap",
  },

  ".pieceGrid": {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "0",
    padding: "0 2vw 3em",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  ".pieceCard": {
    borderRight: "1px solid rgba(0,0,0,0.1)",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "background 0.15s",
    textDecoration: "none",
    color: "#000",
  },
  ".pieceCard:hover": {
    background: "rgba(0,0,0,0.03)",
  },
  ".pieceCardImg": {
    width: "100%",
    aspectRatio: "4/3",
    objectFit: "cover",
    display: "block",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  ".pieceCardBody": {
    padding: "1em 1.2em 1.2em",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  ".pieceCardType": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#999",
  },
  ".pieceCardTitle": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "18px",
    lineHeight: 1.3,
    color: "#000",
  },
  ".pieceCardAuthor": {
    fontFamily: "EB Garamond, serif",
    fontSize: "15px",
    color: "#555",
    fontStyle: "italic",
    marginTop: "2px",
  },

  "@media (max-width: 835px)": {
    ".pieceGrid": {
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    },
    ".genreBtn, .genreBtnActive": {
      padding: "12px 12px",
      fontSize: "12px",
    },
  },
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "art", label: "Art" },
  { key: "fiction", label: "Fiction" },
  { key: "poetry", label: "Poetry" },
  { key: "personalessay", label: "Essays" },
  { key: "interviews", label: "Interviews" },
];

function resolveImage(source, category) {
  if (!source || source.trim() === "") return null;
  if (source.startsWith("./artimages/")) {
    return `/womensissue/art/${source.replace("./artimages/", "")}`;
  }
  const iconsMatch = source.match(/icons\/(.+)$/);
  if (iconsMatch) return `/womensissue/icons/${iconsMatch[1]}`;
  return null;
}

export default function WomensIssue({ pieces }) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all" ? pieces : pieces.filter((p) => p.category === activeTab);

  return (
    <>
      <NextSeo
        title="The Women's Issue"
        description="The Harvard Advocate Women's Issue — fiction, poetry, personal essays, interviews, and art celebrating women's voices."
        canonical="https://theharvardadvocate.com/women"
      />
      <div sx={womenSx}>
        {/* Hero */}
        <div className="heroSection">
          <div className="heroOverlay" />
          <div className="heroInner">
            <h1 className="heroTitle">The Women&rsquo;s Issue</h1>
            <p className="heroSub">
              The Harvard Advocate &mdash; Fiction &bull; Poetry &bull; Essays &bull; Interviews &bull; Art
            </p>
            <img src="/womensissue/cover.jpg" alt="Women's Issue Cover" className="heroCover" />
          </div>
        </div>

        {/* Genre nav */}
        <nav className="genreNav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={activeTab === cat.key ? "genreBtnActive" : "genreBtn"}
              onClick={() => setActiveTab(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Grid */}
        <div className="pieceGrid">
          {filtered.map((piece) => {
            const imgSrc = resolveImage(piece.source, piece.category);
            return (
              <Link
                key={piece.slug}
                href={`/women/${piece.slug}`}
                className="pieceCard"
              >
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={piece.title}
                    className="pieceCardImg"
                    loading="lazy"
                  />
                )}
                {!imgSrc && (
                  <div style={{
                    aspectRatio: "4/3",
                    background: "linear-gradient(135deg, #f5f0eb 0%, #e8ddd4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                  }}>
                    <span style={{ fontFamily: "Bernhard Gothic Medium, serif", fontSize: "28px", opacity: 0.3 }}>
                      &#9670;
                    </span>
                  </div>
                )}
                <div className="pieceCardBody">
                  <div className="pieceCardType">{piece.type}</div>
                  <div className="pieceCardTitle">{piece.title}</div>
                  <div className="pieceCardAuthor">
                    {piece.type === "Interview"
                      ? `In conversation with ${piece.author}`
                      : piece.author}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const path = require("path");
  const fs = require("fs");

  const baseDir = path.join(
    process.cwd(), "src", "womensissue", "src", "pages", "pieces"
  );

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

  function loadDir(dirPath, category) {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
      .filter((f) => f.endsWith(".md"))
      .map((file) => {
        const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
        const fm = parseFrontmatter(raw);
        const body = parseBody(raw);
        const slug = fm.path ? fm.path.replace(/^\//, "") : file.replace(".md", "");
        return {
          slug,
          title: fm.title || slug,
          author: fm.author || "",
          type: fm.type || "",
          source: fm.source || "",
          interview: fm.interview || "",
          category,
          body,
        };
      });
  }

  const pieces = [
    ...loadDir(path.join(baseDir, "art"), "art"),
    ...loadDir(path.join(baseDir, "written", "fiction"), "fiction"),
    ...loadDir(path.join(baseDir, "written", "poetry"), "poetry"),
    ...loadDir(path.join(baseDir, "written", "personalessay"), "personalessay"),
    ...loadDir(path.join(baseDir, "interviews"), "interviews"),
  ];

  return {
    props: { pieces },
    revalidate: 86400,
  };
}
