import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
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

// Styled Components
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
  text-align: center;
  margin-bottom: 3rem;
  font-family: "Playfair Display", serif;
  animation: ${fadeIn} 2s ease-out forwards;
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

  h4 {
    font-size: 1.3rem;
    margin-top: 2rem;
    animation: ${fadeIn} 1s ease forwards;
  }

  p {
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: ${(props) => props.delay || "0s"};
  }
`;

const AnimatedWord = styled.span`
  display: inline-block;
  opacity: 0;
  margin-right: 8px;
  animation: ${wordFadeIn} 0.5s forwards;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const ContactInfo = styled.address`
  font-style: normal;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;

  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }

  p {
    margin: 0.5rem 0;
  }
`;

// Main Component
export default function ContactUs() {
  const createAnimatedText = (text) => {
    return text.split(" ").map((word, index) => (
      <AnimatedWord key={index} delay={`${index * 0.2}s`}>
        {word}{" "}
      </AnimatedWord>
    ));
  };

  return (
    <Wrapper>
      <TypewriterText>📞 Connect With Us! 💬</TypewriterText>

      <ContentSection>
        <h2>We'd Love to Hear From You</h2>
        <p delay="0.5s">
          {createAnimatedText(
            "If you have any questions, concerns, or feedback, please don’t hesitate to reach out to us. We're here to help!"
          )}
        </p>
        <p delay="1s">
          {createAnimatedText(
            "Our team is always ready to assist you with anything you need. Whether it’s about the Terms of Service or just a simple inquiry, we are happy to help."
          )}
        </p>

        <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
          Contact Details:
        </h3>
        <ContactInfo>
          <p>Bookheaven (Private) Limited</p>
          <p>
            <a href="mailto:Bookheaven@gmail.com">Bookheaven@gmail.com</a>
          </p>
          <p>
            <a
              href="https://wa.me/94754885720"
              target="_blank"
              rel="noopener noreferrer"
            >
              0754885720
            </a>
          </p>
        </ContactInfo>
      </ContentSection>

      <ContentSection>
        <h2>Terms of Service</h2>

        <h4 style={{ animationDelay: "0.2s" }}>SECTION 14 – INDEMNIFICATION</h4>
        <p delay="0.3s">
          {createAnimatedText(
            "You agree to indemnify, defend and hold harmless Jump (Private) Limited and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party."
          )}
        </p>

        <h4 style={{ animationDelay: "0.6s" }}>SECTION 15 – SEVERABILITY</h4>
        <p delay="0.7s">
          {createAnimatedText(
            "In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions."
          )}
        </p>

        <h4 style={{ animationDelay: "1s" }}>SECTION 16 – TERMINATION</h4>
        <p delay="1.1s">
          {createAnimatedText(
            "The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site."
          )}
        </p>
      </ContentSection>
    </Wrapper>
  );
}
