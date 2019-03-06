import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => {
  const post = data.allMarkdownRemark
  console.log(post.edges);
  return (
    <Layout data={this.props.data} location={this.props.location}>
      <div>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
{
  site {
    siteMetadata {
      languages {
        defaultLangKey
        langs
      }
    }
  }
  allMarkdownRemark{
    edges{
      node{
        fields{
          slug
        }
        frontmatter{
          lang
          title
        }
      }

    }
  }
}
`
