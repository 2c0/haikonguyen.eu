import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Article from '../../components/article/article.component';
import Layout from '../../components/layout/layout.component';
import PostTags from '../../components/post-tags/post-tags';
import SEO from '../../components/seo/seo';
import config from '../../../data/SiteConfig';
import PostHeader, { StyledPlaceholder } from './post.style';
import bgPlaceHolder from '../../img/bgMacPlaceholder.jpg';

const PostTemplate = (props) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  let cover;
  if (post.cover) {
    cover = post.cover.childImageSharp.fluid;
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      {cover ? (
        <PostHeader Tag='section' fluid={cover}>
          <div className='postHeaderWrap container--fixed'>
            <PostTags className='postHeaderWrap__tags' tags={post.tags} />
          </div>
        </PostHeader>
      ) : (
        <StyledPlaceholder
          style={{ backgroundImage: `url(${bgPlaceHolder})` }}
        />
      )}
      <Article title={post.title} postHtml={postNode.html} />
    </Layout>
  );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid(quality: 80, maxWidth: 2400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        date
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
