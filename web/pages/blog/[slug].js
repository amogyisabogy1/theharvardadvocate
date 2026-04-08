/** @jsxImportSource theme-ui */
import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import allPosts from "../../lib/data/blog-posts.json";

const blogPostSx = {
  ".postHeader": {
    borderBottom: "1px solid #000",
    padding: "2em 2vw 1em",
    maxWidth: "760px",
    margin: "0 auto",
  },
  ".postMeta": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#999",
    marginBottom: "0.6em",
  },
  ".postTitle": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "clamp(24px, 4vw, 40px)",
    lineHeight: 1.15,
    margin: "0 0 0.4em",
  },
  ".postAuthor": {
    fontFamily: "EB Garamond, serif",
    fontSize: "17px",
    fontStyle: "italic",
    color: "#555",
  },
  ".postBody": {
    maxWidth: "760px",
    margin: "2em auto 4em",
    padding: "0 2vw",
    fontFamily: "EB Garamond, serif",
    fontSize: "18px",
    lineHeight: 1.75,
    color: "#000",
    p: { marginBottom: "1.4em" },
    img: { maxWidth: "100%", height: "auto", display: "block", margin: "1.5em auto" },
    iframe: { maxWidth: "100%", display: "block", margin: "1.5em auto" },
    blockquote: {
      borderLeft: "4px solid rgba(0,0,0,0.15)",
      paddingLeft: "1em",
      fontStyle: "italic",
      color: "#555",
      margin: "1.5em 0",
    },
    a: { color: "#000", textDecoration: "underline" },
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

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({ post }) {
  if (!post) return <div sx={blogPostSx}><p style={{ padding: "2em" }}>Post not found.</p></div>;

  return (
    <>
      <NextSeo
        title={`${post.title} — Blog Archive`}
        description={`${post.author_name ? post.author_name + " — " : ""}The Harvard Advocate Blog`}
      />
      <div sx={blogPostSx}>
        <Link href="/blog" className="backLink">← Blog Archive</Link>
        <div className="postHeader">
          <div className="postMeta">
            {post.created && <span>{formatDate(post.created)}</span>}
            {post.category_name && <span> &bull; {post.category_name}</span>}
          </div>
          <h1 className="postTitle">{post.title}</h1>
          {post.author_name && <div className="postAuthor">By {post.author_name}</div>}
        </div>
        <div className="postBody" dangerouslySetInnerHTML={{ __html: post.body || "" }} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = allPosts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}
