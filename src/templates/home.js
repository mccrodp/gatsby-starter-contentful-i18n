import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

const HomePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  return (
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          borderBottom: `1px solid lightgray`,
          paddingBottom: rhythm(1 / 2),
          marginBottom: rhythm(1 / 2),
        }}
      >
       {title}
      <PageContent className="content" content={content} />
      </div>
)
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class HomePage extends React.Component {

  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
    }
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div style={{ marginBottom: rhythm(2) }}>
            <HomePageTemplate
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
             />
        </div>
      </Layout>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
    site {
    siteMetadata {
      languages {
        defaultLangKey
        langs
      }
    }
  }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      },
       fields{
        slug

      }
    }
  }
`
