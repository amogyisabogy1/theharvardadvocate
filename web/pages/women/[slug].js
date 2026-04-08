/** @jsxImportSource theme-ui */
import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import allPieces from "../../lib/data/womensissue.json";

const pieceSx = {
  ".pieceHeader": {
    borderBottom: "1px solid #000",
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
    margin: "2em auto 4em",
    padding: "0 2vw",
    fontFamily: "EB Garamond, serif",
    fontSize: "18px",
    lineHeight: 1.75,
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

function mdToHtml(text) {
  if (!text) return "";
  return text
    .replace(/__\*(.+?)\*__/g, "<strong><em>$1</em></strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
    .replace(/\n\n+(?!<)/g, "<br /><br />")
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
            <div className="pieceBody" dangerouslySetInnerHTML={{ __html: htmlBody }} />
          </>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = allPieces.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const piece = allPieces.find((p) => p.slug === params.slug);
  if (!piece) return { notFound: true };
  return { props: { piece } };
}
