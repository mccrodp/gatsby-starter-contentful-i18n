import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/Layout"

const propTypes = {
  data: PropTypes.object.isRequired,
}

const Product = ({ node }) => (

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

class IndexPage extends React.Component {
  render() {
    var enProductEdges = [];
    if (this.props.data.en !== null) {
      const enProductEdges = this.props.data.en.edges
    }
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
          <h3>en</h3>
          {enProductEdges.map(({ node }, i) => (
            <Product node={node} key={node.id} />
          ))}
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
  query PageEnUsQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    en: allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
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
