/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { NextSeo } from "next-seo";
import blogListing from "../lib/data/blog-listing.json";

const POSTS_PER_PAGE = 20;

const blogArchiveSx = {
  ".fontMod": {
    fontFamily: "Bernhard Gothic Medium, serif",
  },
  ".pageHeader": {
    textAlign: "center",
    padding: "2em 2vw 1em",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
  ".postList": {
    padding: "0 2vw",
    maxWidth: "800px",
    margin: "0 auto",
  },
  ".postItem": {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: "1.2em 0",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  ".postItem:last-child": {
    borderBottom: "none",
  },
  ".postTitle": {
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "20px",
    color: "#000",
    textDecoration: "none",
    lineHeight: "1.3",
  },
  ".postTitle:hover": {
    textDecoration: "underline",
  },
  ".postMeta": {
    fontFamily: "EB Garamond, serif",
    fontSize: "15px",
    color: "#666",
  },
  ".pagination": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    padding: "2em 0",
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "16px",
  },
  ".pageBtn": {
    cursor: "pointer",
    padding: "6px 14px",
    border: "1px solid #000",
    borderRadius: "3px",
    background: "#fff",
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "15px",
    color: "#000",
    textDecoration: "none",
  },
  ".pageBtn:hover": {
    background: "#000",
    color: "#fff",
  },
  ".pageBtnDisabled": {
    padding: "6px 14px",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "3px",
    background: "#f5f5f5",
    fontFamily: "Bernhard Gothic Medium, serif",
    fontSize: "15px",
    color: "#aaa",
    cursor: "default",
  },
  "@media (max-width: 835px)": {
    ".postList": {
      padding: "0 4vw",
    },
  },
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogArchive({ posts }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagePosts = posts.slice(page * POSTS_PER_PAGE, (page + 1) * POSTS_PER_PAGE);

  return (
    <>
      <NextSeo
        title="Blog Archive"
        description="The Harvard Advocate blog archive — Notes from 21 South Street and older blog posts."
        canonical="https://theharvardadvocate.com/blog"
      />
      <div sx={blogArchiveSx}>
        <div className="pageHeader">
          <h1 sx={{ variant: "styles.h1" }}>
            <div className="fontMod">Blog Archive</div>
          </h1>
          <p sx={{ variant: "styles.p" }}>
            <i>{posts.length} posts from the Harvard Advocate blog</i>
          </p>
        </div>

        <div className="postList">
          {pagePosts.map((post) => (
            <div className="postItem" key={post.id}>
              <a
                className="postTitle"
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </a>
              <div className="postMeta">
                {post.author_name && <span>{post.author_name}</span>}
                {post.author_name && post.created && <span> &mdash; </span>}
                {post.created && <span>{formatDate(post.created)}</span>}
                {post.category_name && (
                  <span style={{ marginLeft: "8px", color: "#999" }}>
                    &bull; {post.category_name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {page > 0 ? (
            <button className="pageBtn" onClick={() => { setPage(page - 1); window.scrollTo(0,0); }}>
              &larr; Prev
            </button>
          ) : (
            <span className="pageBtnDisabled">&larr; Prev</span>
          )}
          <span>
            Page {page + 1} of {totalPages}
          </span>
          {page < totalPages - 1 ? (
            <button className="pageBtn" onClick={() => { setPage(page + 1); window.scrollTo(0,0); }}>
              Next &rarr;
            </button>
          ) : (
            <span className="pageBtnDisabled">Next &rarr;</span>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: blogListing } };
}
