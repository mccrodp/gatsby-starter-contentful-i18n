import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"
import Content, { HTMLContent } from '../components/Content'

const propTypes = {
  data: PropTypes.object.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}


class GeneralPage extends React.Component {

  render() {
    //const PageContent = contentComponent || Content
    var itProductEdges = [];
    if (this.props.data.german !== null) {
      itProductEdges = this.props.data.german.edges
    }
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
          <h3>it</h3>

        </div>
      </Layout>
    )
  }
}

GeneralPage.propTypes = propTypes

export default GeneralPage

export const generalPageQuery = graphql`
  query GeneralQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    german: allMarkdownRemark {
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
