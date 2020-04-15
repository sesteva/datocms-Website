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
    render={data => (
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
                __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html
              }}
            />
            <ul className="sidebar__menu">
              <li>
                <Link to="/">Latest</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/talks">Talks</Link>
              </li>
              <li>
                <Link to="/open-source">Open Source</Link>
              </li>
              <li>
                <Link to="/manager-resources">Manager Resources</Link>
              </li>
              <li>
                <a
                  href="http://graphqlscalars.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
                <Link to="/">Latest</Link>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/talks">Talks</Link>
                <Link to="/open-source">OS</Link>
                <Link to="/manager-resources">Mgr Rsc</Link>
                <a
                  href="http://graphqlscalars.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
  children: PropTypes.object
};

export default TemplateWrapper;
