import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";

import "../styles/index.sass";
import "../styles/site.css";

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        datoCmsSite {
          globalSeo {
            siteName
          }
          faviconMetaTags {
            ...GatsbyDatoCmsFaviconMetaTags
          }
        }
        datoCmsHome {
          seoMetaTags {
            ...GatsbyDatoCmsSeoMetaTags
          }
          introTextNode {
            childMarkdownRemark {
              html
            }
          }
          copyright
        }
        allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
          edges {
            node {
              profileType
              url
            }
          }
        }
      }
    `}
    render={(data) => (
      <div className="container">
        <HelmetDatoCms
          favicon={data.datoCmsSite.faviconMetaTags}
          seo={data.datoCmsHome.seoMetaTags}
        />
        <div className="container__sidebar">
          <div className="sidebar">
            <h6 className="sidebar__title">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </h6>
            <div
              className="sidebar__intro"
              dangerouslySetInnerHTML={{
                __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
              }}
            />
            <ul className="sidebar__menu">
              <li>
                <Link to="/" data-i18n-key="latest">
                  Latest
                </Link>
              </li>
              <li>
                <Link to="/about" data-i18n-key="about">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" data-i18n-key="blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/talks" data-i18n-key="talks">
                  Talks
                </Link>
              </li>
              <li>
                <Link to="/open-source" data-i18n-key="oss">
                  Open Source
                </Link>
              </li>
              <li>
                <Link to="/manager-resources" data-i18n-key="mgr">
                  Manager Resources
                </Link>
              </li>
              <li>
                <a
                  href="http://graphqlscalars.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-i18n-key="scalars"
                >
                  GraphQL Scalars Index
                </a>
              </li>
            </ul>
            <p className="sidebar__social">
              {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                <a
                  key={profile.profileType}
                  href={profile.url}
                  target="blank"
                  className={`social social--${profile.profileType.toLowerCase()}`}
                >
                  {" "}
                </a>
              ))}
            </p>
            <div className="sidebar__copyright">
              {data.datoCmsHome.copyright}
            </div>
          </div>
        </div>
        <div className="container__body">
          <div className="container__mobile-header">
            <div className="mobile-header">
              <div className="mobile-header__menu_links">
                <Link to="/" data-i18n-key="latest">
                  Latest
                </Link>
                <Link to="/about" data-i18n-key="about">
                  About
                </Link>
                <Link to="/blog" data-i18n-key="blog">
                  Blog
                </Link>
                <Link to="/talks" data-i18n-key="talks">
                  Talks
                </Link>
                <Link to="/open-source" data-i18n-key="oss">
                  OS
                </Link>
                <Link to="/manager-resources" data-i18n-key="mgr">
                  Mgr Rsc
                </Link>
                <a
                  href="http://graphqlscalars.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-i18n-key="scalars"
                >
                  GQL Scalars Index
                </a>
              </div>
              <div className="mobile-header__logo">
                <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    )}
  />
);

TemplateWrapper.propTypes = {
  children: PropTypes.object,
};

export default TemplateWrapper;
