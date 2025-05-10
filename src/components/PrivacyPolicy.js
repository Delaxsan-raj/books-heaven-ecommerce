import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #a1c4fd, #c2e9fb);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 20s ease infinite;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Section = styled.section`
  max-width: 900px;
  margin: 0 auto 4rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  color: #333;
  transition: all 0.4s ease;
  animation: ${fadeIn} 2s ease-out;

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

  h3 {
    margin: 2rem 0 1rem;
    color: #555;
    font-size: 1.5rem;
  }

  p,
  ul {
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  ul {
    padding-left: 1.5rem;
    list-style-position: inside;
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #2c83eb;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #1a5fb4;
      text-decoration: underline;
    }
  }
`;

export default function PrivacyPolicy() {
  return (
    <Wrapper>
      <Section>
        <h2>Privacy Policy</h2>
        <p>
          <strong>Effective Date:</strong> October 1, 2023
        </p>
        <p>
          At Jump (Private) Limited, we value your privacy. This Privacy Policy
          outlines how we collect, use, and share your personal information when
          you visit or make a purchase from our website,
          <a
            href="https://jumpbooks.lk"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            jumpbooks.lk
          </a>
          .
        </p>

        <h3>Information We Collect</h3>
        <p>
          <strong>1. Device Information</strong>
        </p>
        <ul>
          <li>Browser type</li>
          <li>IP address</li>
          <li>Time zone</li>
          <li>Cookies installed</li>
          <li>Pages viewed and interactions</li>
          <li>Referring sites or search terms</li>
        </ul>
        <p>Collected via:</p>
        <ul>
          <li>
            Cookies (learn more at{" "}
            <a
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.allaboutcookies.org
            </a>
            )
          </li>
          <li>Log Files</li>
          <li>Web Beacons / Tags / Pixels</li>
        </ul>

        <p>
          <strong>2. Order Information</strong>
        </p>
        <ul>
          <li>Full name</li>
          <li>Billing and shipping address</li>
          <li>Payment details (e.g., credit card info)</li>
          <li>Email address</li>
          <li>Phone number</li>
        </ul>

        <p>
          Together, these are considered <strong>Personal Information</strong>.
        </p>

        <h3>How We Use Your Personal Information</h3>
        <ul>
          <li>To process and fulfill orders</li>
          <li>To communicate with you</li>
          <li>To screen for fraud or risk</li>
          <li>To provide marketing (based on your preferences)</li>
          <li>To improve your experience via analytics</li>
          <li>
            To display your first name and order info using Notification X to
            show recent purchases on the site
          </li>
        </ul>

        <h3>Sharing Your Information</h3>
        <p>
          We may share your Personal Information with third-party services such
          as:
        </p>
        <ul>
          <li>WooCommerce – our e-commerce platform</li>
          <li>
            Google Analytics – for website usage tracking (
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
            )
          </li>
        </ul>
        <p>
          To opt out of Google Analytics:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Opt-out here
          </a>
        </p>

        <p>
          We may also disclose information to comply with legal obligations,
          protect rights, or respond to lawful requests.
        </p>

        <h3>Behavioral Advertising</h3>
        <p>
          Your information may be used for targeted advertising. You can opt out
          via:
        </p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/settings/?tab=ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook Ads Settings
            </a>
          </li>
          <li>
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
          </li>
          <li>
            <a
              href="https://account.microsoft.com/privacy/ad-settings"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bing Ads Settings
            </a>
          </li>
          <li>
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              DAA Opt-out Portal
            </a>
          </li>
        </ul>

        <h3>Do Not Track</h3>
        <p>
          Please note: We do not alter our data collection in response to “Do
          Not Track” signals.
        </p>

        <h3>Data Retention</h3>
        <p>
          We retain your order information unless and until you request
          deletion.
        </p>

        <h3>Policy Updates</h3>
        <p>
          We may update this Privacy Policy from time to time. The latest
          version will always be posted here with the revised date.
        </p>

        <h3>Contact Us</h3>
        <p>
          For questions, contact us via our contact page or email us directly.
        </p>
      </Section>
    </Wrapper>
  );
}
