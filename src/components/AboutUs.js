import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animations
const typing = keyframes`
  from { width: 0 }
  to { width: 52ch }
`;

const blink = keyframes`
  0%, 100% { border-color: transparent }
  50% { border-color: white }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const wordFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components
const Wrapper = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 20s ease infinite;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const TypewriterText = styled.h1`
  font-size: 2.5rem;
  white-space: normal; // Allow word wrapping
  overflow: visible; // Remove the 'overflow' property to allow better text display
  border-right: 3px solid white;
  width: auto; // Adjust width to avoid cutting off the text
  margin: 0 auto 3rem;
  text-align: center;
  font-family: "Playfair Display", serif;
  animation: ${typing} 4.5s steps(52, end), ${blink} 1s step-end infinite;
`;

const ContentSection = styled.section`
  max-width: 900px;
  margin: 0 auto 4rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  color: #333;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    color: #444;
    font-weight: 600;
  }

  p {
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    animation: ${fadeIn} 2s ease-out forwards;
    animation-delay: ${(props) => props.delay || "0s"};
  }
`;

const AnimatedWord = styled.span`
  display: inline-block;
  opacity: 0;
  margin-right: 8px; // Add space between words
  animation: ${wordFadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 items per row */
  gap: 2rem;
  justify-items: center;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  width: 250px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 100px;
    margin-bottom: 1rem;
    object-fit: cover;
    border: 4px solid #f1f1f1;
  }

  h3 {
    margin: 0.5rem 0 0.3rem;
    font-size: 1.3rem;
    color: #222;
  }

  .title {
    font-weight: 500;
    color: #777;
    margin-bottom: 0.7rem;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
`;

export default function AboutUs() {
  const createAnimatedText = (text) => {
    return text.split(" ").map((word, index) => (
      <AnimatedWord key={index} delay={`${index * 0.2}s`}>
        {word}{" "}
      </AnimatedWord>
    ));
  };

  return (
    <Wrapper>
      <TypewriterText>
        📖 Where Pages Become Portals to New Worlds 🌍
      </TypewriterText>

      <ContentSection>
        <h2>Our Story</h2>
        <p delay="0.5s">
          {createAnimatedText(
            "It all began with a single book — a dog-eared copy of The 4-Hour Work Week — that found its way into the hands of our founder, Delaxsan Raj, in 2025. That single spark became a wildfire of inspiration."
          )}
        </p>
        <p delay="1s">
          {createAnimatedText(
            "Bookheaven.lk was born not just as a store, but as a sanctuary for curious minds and restless hearts. We're here to connect people with books that nudge them toward their best selves — books that challenge, comfort, inspire, and sometimes completely transform lives."
          )}
        </p>
        <p delay="1.5s">
          {createAnimatedText(
            "Our shelves aren’t just lined with paper — they echo with passion, wisdom, and the whisper of new beginnings. Every story we curate is an invitation to growth, wonder, and change. Because we believe every reader deserves a book that finds them at just the right moment."
          )}
        </p>
      </ContentSection>

      <ContentSection>
        <h2>Meet the Book Wizards</h2>
        <TeamGrid>
          <TeamMember>
            <img src="./images/delaxsan.JPG" alt="Delaxsan Raj" />
            <h3>Delaxsan Raj</h3>
            <p className="title">Chief Book Alchemist</p>
            <p>
              Founder & eternal book evangelist. Believes in the transformative
              power of paper and ink.
            </p>
          </TeamMember>
          <TeamMember>
            <img src="./images/delaxsan.JPG" alt="Delaxsan Raj" />
            <h3>Jane Doe</h3>
            <p className="title">Literary Matchmaker</p>
            <p>
              She’s got a sixth sense for finding the right book for every soul.
            </p>
          </TeamMember>
        </TeamGrid>
      </ContentSection>
    </Wrapper>
  );
}
