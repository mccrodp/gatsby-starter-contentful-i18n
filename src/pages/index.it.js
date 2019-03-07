import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

const propTypes = {
  data: PropTypes.object.isRequired,
}

const Product = ({ node, title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (

  <div>
    <Link
      style={{ color: `inherit`, textDecoration: `none` }}
      to={`/${node.id}/products/${node.frontmatter.nameSlug}/`}
    >
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          borderBottom: `1px solid lightgray`,
          paddingBottom: rhythm(1 / 2),
          marginBottom: rhythm(1 / 2),
        }}
      >
      <PageContent className="content" content={content} />

        <div style={{ marginRight: rhythm(1 / 2) }}>

            <Img
              style={{ margin: 0 }}
              resolutions="20px"
            />

        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    </Link>
  </div>
)
}
class IndexPage extends React.Component {
  render() {
    console.log("inside index");
    var itProductEdges = [];
    if (this.props.data.italian !== null) {
      itProductEdges = this.props.data.italian.edges
    }
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
          <h3>it</h3>
          {itProductEdges.map(({ node }, i) => (

            <Product
            node={node}
            contentComponent={HTMLContent}
            title={node.frontmatter.title}
            content={node.html}
            key={node.id} />
          ))}
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  title: PropTypes.string.isRequired,
  propTypes,
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    italian: allMarkdownRemark {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            tags
            templateKey
            nameSlug
            lang
          }
        }
      }
    }
  }
`
