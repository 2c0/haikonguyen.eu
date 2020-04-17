import React from 'react';
import { navigate } from '@reach/router';
import CustomBtn from '../../components/materialui/button.component';
import profileImg from '../../img/HaikoProfile.jpg';
import profileImg2 from '../../img/HaikoProfile2.jpg';
import Hero from '../../components/hero/hero.component';
import Layout from '../../components/layout/layout.component';
import PostListing from '../../components/post-listing/post-listing.component';
import StyledMain from './home.style';
import config from '../../../data/SiteConfig';
import bgSrc from '../../img/PragueCastle01_opti.jpg';

const Home = () => {
  return (
    <Layout>
      <StyledMain>
        {/* Hero Section */}
        <Hero bgImage={bgSrc} className='homeHero'>
          <div className='homeHero__profileWrap'>
            <section className='homeHero__profileWrap__header'>
              <img src={profileImg} alt='The Avatar' />
            </section>
            <section className='homeHero__profileWrap__description'>
              <h1>{config.siteTitle}</h1>
              <p>WEB DEVELOPER, PHOTOGRAPHER,&nbsp;VLOGGER</p>
            </section>
            <section className='homeHero__profileWrap__buttons'>
              <CustomBtn
                onClick={() => console.log('Do something later')}
                text='Contact Me'
                variant='contained'
                size='large'
                color='primary'
              />
            </section>
          </div>
        </Hero>
        {/* About Section */}
        <section className='sections'>
          <div className='heading'>
            <h1>About</h1>
            <hr />
          </div>
          <div className='about container--fixed'>
            <div>
              <div className='profilePictureWrap'>
                <img
                  className='profilePicture'
                  src={profileImg2}
                  alt='profile avatar'
                />
                <div className='profilePicture--designElement' />
              </div>
            </div>
            <div>
              <h2>HI, I'M HAIKO</h2>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <CustomBtn
                onClick={() => navigate('/about')}
                text='Read My Story'
                variant='outlined'
                color='primary'
              />
            </div>
          </div>
        </section>
        {/* Blog Section */}
        <section className='sections'>
          <div className='heading'>
            <h1>Latest Posts</h1>
            <hr />
          </div>
          <PostListing />
        </section>
      </StyledMain>
    </Layout>
  );
};

export default Home;
