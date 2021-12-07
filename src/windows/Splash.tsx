import React, { useEffect, useState } from "react";
import "../styles/Splash.css";

export function Splash() {
  const [loadingText, setLoadingText] = useState("Checking for updates...");

  useEffect(() => {
    window.api.splashUpdates("splash-update", (data: string) => {
      setLoadingText(data);
    });
  }, []);

  return (
    <div id="splash">
      <i id="logo">
        <svg
          viewBox="0 0 359 435"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Logo">
            <g id="Union">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M45 43H345V213L215 343H168.5L111 400.5V343H45V43Z"
                fill="url(#paint0_linear_2_19)"
              />
              <path
                d="M345 43H359V29H345V43ZM45 43V29H31V43H45ZM345 213L354.899 222.899L359 218.799V213H345ZM215 343V357H220.799L224.899 352.899L215 343ZM168.5 343V329H162.701L158.601 333.101L168.5 343ZM111 400.5H97V434.299L120.899 410.399L111 400.5ZM111 343H125V329H111V343ZM45 343H31V357H45V343ZM345 29H45V57H345V29ZM359 213V43H331V213H359ZM224.899 352.899L354.899 222.899L335.101 203.101L205.101 333.101L224.899 352.899ZM168.5 357H215V329H168.5V357ZM158.601 333.101L101.101 390.601L120.899 410.399L178.399 352.899L158.601 333.101ZM125 400.5V343H97V400.5H125ZM45 357H111V329H45V357ZM31 43V343H59V43H31Z"
                fill="black"
              />
            </g>
            <g id="EyeGroup">
              <rect
                id="Eye2"
                x="249"
                y="103"
                width="42"
                height="119"
                fill="black"
              />
              <rect
                id="Eye1"
                x="153"
                y="103"
                width="42"
                height="119"
                fill="black"
              />
            </g>
            <g id="Bubble">
              <path
                id="Ellipse 1"
                d="M125 62.5C125 97.0178 97.0178 125 62.5 125C27.9822 125 0 97.0178 0 62.5C0 27.9822 27.9822 0 62.5 0C97.0178 0 125 27.9822 125 62.5Z"
                fill="#FF4975"
              />
              <g id="Group 1">
                <rect
                  id="Rectangle 4"
                  x="50"
                  y="87.7241"
                  width="25"
                  height="25"
                  rx="5"
                  fill="white"
                />
                <rect
                  id="Rectangle 5"
                  x="50"
                  y="11"
                  width="25"
                  height="63.7931"
                  rx="5"
                  fill="white"
                />
              </g>
            </g>
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_2_19"
              x1="195"
              y1="43"
              x2="195"
              y2="400.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#03FF86" />
              <stop offset="1" stopColor="#8AFFC7" />
            </linearGradient>
          </defs>
        </svg>
      </i>
      <div className="loading">
        <p className="loading-text">{loadingText}</p>
        <div className="bar"></div>
      </div>
    </div>
  );
}
