import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import { rhythm } from "../utils/typography"
import Link from "gatsby-link"
import 'intl';

import messagesEn from '../data/messages/en-US';
import messagesDe from '../data/messages/de';

const TemplateWrapper = ({ children, data, location, i18nMessages }) => {
  const url = location.pathname;
  const { langs, defaultLangKey } = data.site.siteMetadata.languages;
  const langKey = getCurrentLangKey(langs, defaultLangKey, url);
  const homeLink = `/${langKey}/`;
  const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));

  // Hack for using products / categories template when params not passed to wrapper.
  if (i18nMessages === undefined) {
    if (langKey === 'de') {
      i18nMessages = messagesDe
    } else {
      i18nMessages = messagesEn
    }
  }

  return (
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
          {children()}
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
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const pageQuery = graphql`
  query Layout {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;

