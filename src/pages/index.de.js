import React from "react"
import Link from "gatsby-link"
import { graphql } from 'gatsby'
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

const Product = ({ node }) => (
  <div>
    <Link
      style={{ color: `inherit`, textDecoration: `none` }}
      to={`/${node.node_locale}/products/${node.contentful_id}/`}
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
          {node.image[0].resolutions.src && (
            <Img
              style={{ margin: 0 }}
              resolutions={node.image[0].resolutions}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>{node.productName.productName}</div>
      </div>
    </Link>
  </div>
)

class IndexPage extends React.Component {
  render() {
    var url = '/';
    if (typeof window !== 'undefined') url = location.pathname;
    const { langs, defaultLangKey } = this.props.data.site.siteMetadata.languages;
    const langKey = getCurrentLangKey(langs, defaultLangKey, url);
    const homeLink = `/${langKey}/`;
    const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));
    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    const i18nMessages = require(`../data/messages/${langKey}`);

    const deProductEdges = this.props.data.german.edges
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
        <div style={{ marginBottom: rhythm(2) }}>
          <h2>Localization</h2>
          <p>
            The <code>gatsby-source-contentful</code> plugin offers full support
            for Contentful's localization features. Our sample space includes
            products localized into both English and German.
          </p>
          <p>
            An entry and asset node are created for each locale following fallback
            rules for missing localization. In addition, each node has an
            additional field added, <code>node_locale</code> so you can select for
            nodes from a single locale
          </p>
          <h3>de</h3>
          {deProductEdges.map(({ node }, i) => (
            <Product node={node} key={node.id} />
          ))}
        </div>
      </div>
    )
  }
}

IndexPage.propTypes = propTypes

export default IndexPage

export const pageQuery = graphql`
  query PageDeQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    german: allContentfulProduct(filter: { node_locale: { eq: "de" } }) {
      edges {
        node {
          id
          contentful_id
          node_locale
          productName {
            productName
          }
          image {
            resolutions(width: 75) {
              ...GatsbyContentfulResolutions
            }
          }
        }
      }
    }
  }
`
