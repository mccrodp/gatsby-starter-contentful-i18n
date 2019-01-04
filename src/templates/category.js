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

class CategoryTemplate extends React.Component {
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

    const category = this.props.data.contentfulCategory
    const { title: { title }, product, icon } = category
    const iconImg = icon.resolutions
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
      </div>
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
