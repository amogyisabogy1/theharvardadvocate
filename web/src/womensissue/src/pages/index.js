import React from 'react'
import _ from 'lodash'

import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Circlebutton from '../components/circlebutton'
import Featuredcolumn from '../components/featuredcolumn'
import GenreBar from '../components/genrebar'
import Layout from '../components/layout'
import Navbar from '../components/sidenav'
import PageFooter from '../components/footer'
import Piecepreviewrow from '../components/piecepreviewrow'
import SEO from '../components/seo'
import Shorten from '../components/shorten'
import Shortenfeatured from '../components/shortenfeatured'

class Index extends React.Component {

  state = {
    isLoaded: false,
    featuredSample:[],
    artSample:[],
    essaySample:[],
    fictionSample:[],
    poetrySample:[],
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
          isLoaded: true,
          featuredSample: _.sampleSize(this.props.data.all.edges, 3),
          artSample: _.sampleSize(this.props.data.art.edges, 4),
          essaySample: _.sampleSize(this.props.data.personalessay.edges, 3),
          fictionSample: _.sampleSize(this.props.data.fiction.edges, 3),
          poetrySample: _.sampleSize(this.props.data.poetry.edges, 3)
      })
    }, 300)
  }

  render() {
    const { isLoaded, featuredSample, artSample, essaySample, fictionSample, poetrySample } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Layout>
          <SEO title="The Women's Issue" keywords={[`literary`, `art`, `magazine`, `advocate`]} />

          <Navbar></Navbar>
          <GenreBar></GenreBar>

          <h4 class="top">Featured</h4>
          <div class="featuredrow">
            {featuredSample.map((post, index) => (
              <Featuredcolumn>
                <div class={'featuredtitle-' + index} key={post.node.id}>
                  <a href={post.node.frontmatter.path}>
                  <h3>{post.node.frontmatter.title}</h3>
                  {
                    post.node.frontmatter.type === 'Interview'
                     ? <small style={{marginBottom: `10px`}}>
                        In conversation with {post.node.frontmatter.author}
                       </small>
                     : <small style={{marginBottom: `10px`}}>
                        {post.node.frontmatter.type} by {post.node.frontmatter.author}
                       </small>
                  }
                  <br />
                  </a>
                </div>
              </Featuredcolumn>
            ))
            }
          </div>

          <div class="featuredpiece">
          {featuredSample.map((post, index) => (
            <div class={"item-" + index} href={post.node.frontmatter.path}>
              <a class="featuredLink" href={post.node.frontmatter.path}>
              <img class="featuredImage" alt="first feature" src={post.node.frontmatter.source.childImageSharp.sizes.src}></img>
                <div class="featuredInfo">
                  <h2>{post.node.frontmatter.title}</h2>
                  <small>
                    {post.node.frontmatter.type} by {post.node.frontmatter.author}
                  </small>
                  <Shortenfeatured>
                    {post.node.excerpt}
                  </Shortenfeatured>
                </div>
              </a>
            </div>
          ))}
          </div>
          <div class="linebreak"></div>

          <h4>Explore all</h4>
          <Piecepreviewrow>
            {fictionSample.map(post => (
              <a href={post.node.frontmatter.path}>
                <div class="piecepreviewcolumn">
                  <div key={post.node.id} class="piecepreview fictionpreview">
                      <div class="previewDefault">
                        <img class="previewImage" src={post.node.frontmatter.source.childImageSharp.sizes.src}></img>
                        <div class="previewInfo">
                          <h3>{post.node.frontmatter.title}</h3>
                          <small>
                            {post.node.frontmatter.type} by {post.node.frontmatter.author}
                          </small>
                        </div>
                      </div>

                      <div class="previewOverlay">
                        <div class="overlayContent">
                          <h3>{post.node.frontmatter.title}</h3>
                          <small>
                            {post.node.frontmatter.type} by {post.node.frontmatter.author}
                          </small>
                          <Shorten>{post.node.excerpt}</Shorten><br />
                          <div class="fadetowhite"></div>
                          <Circlebutton> <small> Read more </small> </Circlebutton>
                        </div>
                      </div>
                  </div>
                </div>
              </a>
            ))}
            <a href="/fiction"><h4 class="seemore">See more fiction </h4></a>
          </Piecepreviewrow>
          <div class="linebreak"></div>

          <div class="artrowLink">
            <div class="artRow">
              <div class="artSelection">
                <div class="artpreviewrow">
                  {artSample.map((post, index) => (
                    <div class="artTitleArtist"  key={post.node.id}>
                    <div class={"arttitle-" + index}>
                      <a href={post.node.frontmatter.path}>
                          <h3>{post.node.frontmatter.title}</h3>
                          <small>
                            {post.node.frontmatter.type} by {post.node.frontmatter.author}
                          </small>
                      </a>
                      </div>
                    </div>
                  ))
                  }
                </div>
                </div>
                <div class="rightmostArt">
                  <div class="artpiece">
                  {artSample.map((post, index) => (
                      <div class={"artitem-" + index}>
                        <a href={post.node.frontmatter.path}>
                          <div class="artDisplay"><img alt={post.node.frontmatter.title} src={post.node.frontmatter.source.childImageSharp.sizes.src} /></div>
                        </a>
                      </div>
                  ))
                  }
                  </div>
                </div>
              </div>
            <a href="/art"><h4 class="seemore">See more art</h4></a>
          </div>
        <div class="linebreak"></div>

        <Piecepreviewrow>
          {essaySample.map(post => (
            <a href={post.node.frontmatter.path}>
              <div class="piecepreviewcolumn">
                <div key={post.node.id} class="piecepreview essaypreview">
                    <div class="previewDefault">
                      <img class="previewImage" src={post.node.frontmatter.source.childImageSharp.sizes.src}></img>
                      <div class="previewInfo">
                        <h3>{post.node.frontmatter.title}</h3>
                        <small>
                          {post.node.frontmatter.type} by {post.node.frontmatter.author}
                        </small>
                      </div>
                    </div>

                    <div class="previewOverlay">
                      <div class="overlayContent">
                        <h3>{post.node.frontmatter.title}</h3>
                        <small>
                          {post.node.frontmatter.type} by {post.node.frontmatter.author}
                        </small>
                        <Shorten>{post.node.excerpt}</Shorten><br />
                        <div class="fadetowhite"></div>
                        <Circlebutton> <small> Read more </small> </Circlebutton>
                      </div>
                    </div>
                </div>
              </div>
            </a>
          ))}
          <a href="/personalessay"><h4 class="seemore">See more personal essays </h4></a>
        </Piecepreviewrow>
        <div class="linebreak"></div>

        <Piecepreviewrow>
          {poetrySample.map(post => (
              <div class="piecepreviewcolumn">

                <div key={post.node.id} class="piecepreview poetrypreview">
                <a href={post.node.frontmatter.path}>

                    <div class="previewDefault">
                      <img class="previewImage" src={post.node.frontmatter.source.childImageSharp.sizes.src}></img>
                      <div class="previewInfo">
                        <h3>{post.node.frontmatter.title}</h3>
                        <small>
                          {post.node.frontmatter.type} by {post.node.frontmatter.author}
                        </small>
                      </div>
                    </div>

                    <div class="previewOverlay">
                      <div class="overlayContent">
                        <h3>{post.node.frontmatter.title}</h3>
                        <small>
                          {post.node.frontmatter.type} by {post.node.frontmatter.author}
                        </small>
                        <Shorten>{post.node.excerpt}</Shorten><br />
                        <div class="fadetowhite"></div>
                        <Circlebutton> <small> Read more </small> </Circlebutton>
                      </div>
                    </div>
                    </a>
                </div>
              </div>
          ))}
          <a href="/poetry"><h4 class="seemore">See more poetry </h4></a>
        </Piecepreviewrow>
        <div class="linebreak"></div>

        <PageFooter></PageFooter>

        </Layout>
    )}
  }
}


export default Index;

export const pieceQuery = graphql`
    query PieceIndexQuery {
      all: allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              path
              title
              author
              type
              source {
                childImageSharp{
                  sizes(maxWidth: 630) {
                      src
                  }
                }
              }
            }
            excerpt(pruneLength: 350)
          }
        }
      }
      fiction: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/fiction/"}}) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              author
              type
              source {
                childImageSharp{
                  sizes(maxWidth: 630) {
                      src
                  }
                }
              }
            }
            excerpt
          }
        }
      }
      personalessay: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/personalessay/"}}) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              author
              type
              source {
                childImageSharp{
                  sizes(maxWidth: 630) {
                      src
                  }
                }
              }
            }
            excerpt
          }
        }
      }
      poetry: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/poetry/"}}) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              author
              type
              source {
                childImageSharp{
                  sizes(maxWidth: 630) {
                      src
                  }
                }
              }
            }
            excerpt
          }
        }
      }
      art: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/art/"}}) {
        edges {
          node {
            id
            frontmatter {
              path
              source {
                childImageSharp{
                  sizes(maxWidth: 630) {
                      src
                  }
                }
              }
              title
              author
              type
            }
          }
        }
      }
    }
`
