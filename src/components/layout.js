import React, { Component } from 'react'
import Link from "gatsby-link"
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Helmet from 'react-helmet'
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider, addLocaleData } from 'react-intl';
import { rhythm } from "../utils/typography"
import 'intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import de from 'react-intl/locale-data/de';
import 'intl/locale-data/jsonp/de';

// add concatenated locale data
addLocaleData([...en, ...de]);

class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.children = this.props.children;
    const data = this.props.data;
    const location = this.props.location;
    const url = location.pathname;
    const { langs, defaultLangKey } = data.site.siteMetadata.languages;
    this.langKey = getCurrentLangKey(langs, defaultLangKey, url);
    this.homeLink = `/${this.langKey}/`;
    this.langsMenu = getLangs(langs, this.langKey, getUrlForLang(this.homeLink, url));

    // get the appropriate message file based on langKey
    // at the moment this assumes that langKey will provide us
    // with the appropriate language code
    this.i18nMessages = require(`../data/messages/${this.langKey}`);
  }
  render() {
    return (
      <IntlProvider
        locale={this.langKey}
        messages={this.i18nMessages}
      >
        <div>
          <Helmet
            title="Gatsby Default Starter"
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Header langs={this.langsMenu} />
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
            {this.children}
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
  }
}

export default TemplateWrapper
