import { useState } from 'react';
import PropTypes from 'prop-types';
import { getProviders, signIn, signOut, getSession } from 'next-auth/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Header from 'components/Landing/Header/index';
import Hero from 'components/Landing/Hero';
import LandingSpaces from 'components/Landing/LandingSpaces';
import BigFeature, { DIRECTIONS } from 'components/Landing/BigFeature';
import BigStats from 'components/Landing/BigStats';
import SmallFeatures from 'components/Landing/SmallFeatures';
import Footer from 'components/Landing/Footer';

const Landing = ({ data, bigFeatures, stats, smallFeatures, providers }) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* <Header
          authDialogOpen={authDialogOpen}
          setAuthDialogOpen={setAuthDialogOpen}
          providers={providers}
          signIn={signIn}
          signOut={signOut}
          getSession={getSession}
        /> */}
        <Hero setAuthDialogOpen={setAuthDialogOpen} />
      </div>
      <LandingSpaces data={data} />
      {bigFeatures.map((feature, index) => (
        <BigFeature
          key={index}
          title={feature.title}
          body={feature.body}
          img={feature.img}
          direction={index % 2 ? DIRECTIONS.BACKWARDS : DIRECTIONS.FORWARDS}
        />
      ))}
      <BigStats stats={stats} />
      <SmallFeatures features={smallFeatures} />
      {/* <Footer /> */}
    </>
  );
};

Landing.propTypes = {
  providers: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  bigFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
  smallFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const getStaticProps = async ({ locale }) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
      ...(await serverSideTranslations(locale, ['common'])),
      data: [
        {
          name: 'UW Math 2025',
          description: 'finals grind, upper years available in chat for help with past exams',
          headCount: '17',
          music: 'lofi 2',
        },
        {
          name: "Capstone Grind '25",
          description: 'writing your report, making your presentation, setting up data',
          headCount: '23',
          music: 'cafe beats eng edition F21',
        },
        {
          name: 'UW Math 2025',
          description: '3rd and 4th years offering help in MSCI, GENE, MATH, and CS',
          headCount: '8',
          music: 'none',
        },
      ],
      bigFeatures: [
        {
          title: 'Customizable Spaces',
          body: 'Customizable spaces tailored to your own interests! Choose how to study, when to study, and who to study with! Additional study features include built-in to-do, Spotify music, and chat!',
          img: '/images/study_space.png',
        },
        {
          title: 'Virtual study enhancements',
          body: 'Virtual study enhancements help you improve your studying! Don\'t forget to use the Pomodoro study timer, Spotify built-in music player to share songs, and built-in to-do app.',
          img: '/images/study_space.png',
        },
        {
          title: 'Communities of students',
          body: 'Find communities of student to improve your studying! Join rooms and engage with other students through video chat, voice messaging, and text chat! ',
          img: '/images/study_space.png',
        },
      ],
      stats: [
        {
          score: '99%',
          description: 'of productivity can be maximized by studying with other students',
        },
        {
          score: 12,
          description: 'flourishing online communities awaiting you to join them!',
        },
        {
          score: '9 / 10',
          description: 'average rating of students who use Productify to help them study',
        },
      ],
      smallFeatures: [
        {
          title: 'MATH 135',
          body: 'what is a matrix...? Linear Algebra fundamentals',
          img: '/images/avatar/anime.png',
        },
        {
          title: 'MATH 137',
          body: 'Official Productify MATH 137 channel. Calculus 1 for UWaterloo Students.',
          img: '/images/avatar/anime.png',
        },
        {
          title: 'CS 135',
          body: 'print("Welcome to CS135") Official website: https://student.cs.uwaterloo.ca/~cs135/',
          img: '/images/avatar/anime.png',
        },
        {
          title: 'ENGL 101',
          body: 'To be or to not to be...',
          img: '/images/avatar/anime.png',
        },
        {
          title: 'PSYCH 201',
          body: 'Psychology 201. Welcome!',
          img: '/images/avatar/anime.png',
        },
        {
          title: 'ECE 350',
          body: 'embrace the suffering.',
          img: '/images/avatar/anime.png',
        },
      ],
    },
  };
};

export default Landing;
