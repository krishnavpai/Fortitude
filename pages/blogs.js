import React from 'react';
import Section2 from '../components/blogs/section2';
import Section3 from '../components/blogs/section3';
import Navigation from '../components/landing/landingNav';
import { GraphQLClient, gql } from 'graphql-request';
import { NavbarCommon, Wrapper } from '../components';
import Image from 'next/image';
import JournalEntry from '../components/reflect/JournalEntry';
import BlogNews from '../components/blogs/blogNews';

const graphcms = new GraphQLClient(
  `https://api-ap-south-1.hygraph.com/v2/claytpp3r1e5801uqaginexz8/master`
);

const QUERY = gql`
  query {
    blogPosts {
      content {
        html
      }
      slug
      date
      title
      photo {
        url
      }
      author {
        name
        profile {
          url
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const { blogPosts } = await graphcms.request(QUERY);
  return {
    props: {
      blogPosts,
    },
    revalidate: 120,
  };
}

const Blogs = ({ blogPosts }) => {
  return (
    <>
      <NavbarCommon />
      <div style={{ paddingTop: '5em' }}>
        {/* <Navigation />    */}
        <div className="mt- py-4">
          {blogPosts.map((blogPost) => (
            <section
              key={blogPost.slug}
              className="text-gray-600 body-font overflow-hidden"
            >
              <div className="container">
                <div className="flex flex-wrap">
                  <img
                    alt="ecommerce"
                    className=" mx-auto h-64 rounded shadow-2xl"
                    src={blogPost.photo.url}
                  />

                  <div className=" w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      {blogPost.title}
                    </h1>
                    <div className="flex items-center text-lg title-font text-gray-900 tracking-widest">
                      <img
                        src={blogPost.author.profile.url}
                        alt="profile"
                        className="rounded-full w-12 h-12 mr-4"
                      />
                      {blogPost.author.name}
                    </div>
                    <div className="flex mb-4">
                      <span className="flex items-center text-orange-600">
                        {`Date : ${blogPost.date}`}
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                    </div>
                    <div className="leading-relaxed">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blogPost.content.html,
                        }}
                      />
                    </div>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <BlogNews />

        <Section2 />
        <Section3 />
      </div>
    </>
  );
};

export default Blogs;
