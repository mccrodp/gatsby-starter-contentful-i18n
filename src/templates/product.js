import React from "react"
import { Link, graphql } from "gatsby"
import * as PropTypes from "prop-types"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"
import Header from '../components/Header'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import 'intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import de from 'react-intl/locale-data/de';
import 'intl/locale-data/jsonp/de';

// add concatenated locale data
addLocaleData([...en, ...de]);

const propTypes = {
  data: PropTypes.object.isRequired,
}

class ProductTemplate extends React.Component {
  render() {
    const url = '/';
    if (typeof window !== 'undefined') url = location.pathname;
    const { langs, defaultLangKey } = this.props.data.site.siteMetadata.languages;
    const langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const homeLink = `/${langKey}/`;
    const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));
    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    const i18nMessages = require(`../data/messages/${langKey}`);

    const product = this.props.data.contentfulProduct
    const {
      productName: { productName },
      productDescription,
      price,
      image,
      brand,
      categories,
    } = product
    return (
      <div>
        <IntlProvider
        locale={langKey}
        messages={i18nMessages}
        >
          <div>
            <Helmet
              title="Gatsby Default Starter"
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            />
            <Header langs={langsMenu} />
            <div
              style={{
                margin: `0 auto`,
                marginTop: rhythm(1.5),
                marginBottom: rhythm(1.5),
                maxWidth: 650,
                paddingLeft: rhythm(3 / 4),
                paddingRight: rhythm(3 / 4),
              }}
            >
              <Link style={{ textDecoration: `none` }} to="/">
                <h3 style={{ color: `tomato`, marginBottom: rhythm(1.5) }}>
                  Example of using Contentful as a data source for a Gatsby site
                </h3>
              </Link>
              <hr style={{ marginTop: rhythm(3) }} />
              <p>
                The src for this website is at
                {` `}
                <a href="https://github.com/gatsbyjs/gatsby/tree/master/examples/using-contentful">
                  https://github.com/gatsbyjs/gatsby/tree/master/examples/using-contentful
                </a>
              </p>
              <p>
                The Contentful site that is providing the data for this site is at
                {` `}
                <a href="https://discovery.contentful.com/entries/by-content-type/2PqfXUJwE8qSYKuM0U6w8M?delivery_access_token=e481b0f7c5572374474b29f81a91e8ac487bb27d70a6f14dd12142837d8e980a&space_id=ubriaw6jfhm1">
                  https://discovery.contentful.com/entries/by-content-type/2PqfXUJwE8qSYKuM0U6w8M?delivery_access_token=e481b0f7c5572374474b29f81a91e8ac487bb27d70a6f14dd12142837d8e980a&space_id=ubriaw6jfhm1
                </a>
              </p>
            </div>
          </div>
        </IntlProvider>
        <div>
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <Img resolutions={image[0].resolutions} />
            <h4>{productName}</h4>
          </div>
          <h1>{productName}</h1>
          <h4>Made by {brand.companyName.companyName}</h4>
          <div>
            <span>Price: ${price}</span>
            <div
              dangerouslySetInnerHTML={{
                __html: productDescription.childMarkdownRemark.html,
              }}
            />
            <div>
              <span>See other: </span>
              <ul>
                {categories.map((category, i) => (
                  <li key={i}>
                    <Link key={i} to={`/${category.node_locale}/categories/${category.contentful_id}`}>
                      {category.title.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductTemplate.propTypes = propTypes

export default ProductTemplate

export const pageQuery = graphql`
  query productQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    contentfulProduct(id: { eq: $id }) {
      productName {
        productName
      }
      productDescription {
        childMarkdownRemark {
          html
        }
      }
      price
      image {
        resolutions(width: 50, height: 50) {
          base64
          src
          srcSet
          height
          width
        }
      }
      brand {
        companyName {
          companyName
        }
      }
      categories {
        id
        contentful_id
        node_locale
        title {
          title
        }
      }
    }
  }
`
