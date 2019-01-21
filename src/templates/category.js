import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.data.contentfulCategory
    const { title: { title }, product, icon } = category
    const iconImg = icon.resolutions
    return (
      <Layout data={this.props.data} location={this.props.location}>
        <div>
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              marginBottom: rhythm(1 / 2),
            }}
          >
            <Img
              style={{
                height: iconImg.height,
                width: iconImg.width,
                marginRight: rhythm(1 / 2),
              }}
              resolutions={iconImg}
            />
            <h4 style={{ marginBottom: 0 }}>{title}</h4>
          </div>
          <h1>{title}</h1>
          <div>
            <span>Products</span>
            <ul>
              {product &&
                product.map((p, i) => (
                  <li key={i}>
                    <Link to={`/${p.node_locale}/products/${p.contentful_id}`}>
                      {p.productName.productName}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

CategoryTemplate.propTypes = propTypes

export default CategoryTemplate

export const pageQuery = graphql`
  query categoryQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    contentfulCategory(id: { eq: $id }) {
      title {
        title
      }
      icon {
        resolutions(width: 75) {
          base64
          src
          srcSet
          height
          width
        }
      }
      product {
        id
        contentful_id
        node_locale
        productName {
          productName
        }
      }
    }
  }
`
