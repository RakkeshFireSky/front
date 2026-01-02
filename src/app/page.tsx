"use client";

import { useRouter } from "next/navigation";
import Style from "./page.module.css";
import Logo from '../../public/logo.png'
import Image from "next/image";
export default function Home() {
  const redirect = useRouter();
  return (
    <>
      <div className={Style.main}>
        <div className={Style.topbar}>
          <div>
            <Image src={Logo} alt="Logo" />
          </div>
          <div>
            <button
              className={Style.login}
              onClick={() => redirect.push("/sign-in")}
            >
              Login
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div className={Style.Content}>
          <h1>MERN + AI</h1>
          <h2>Future Tech Stacks</h2>

          <p className={Style.description}>
            Build powerful, scalable, and intelligent web applications using the
            MERN Stack combined with Artificial Intelligence. This modern tech
            stack helps developers stay ahead in the fast-evolving software
            industry.
          </p>

          <div className={Style.features}>
            <div className={Style.card}>
              <h3>🚀 Full Stack Development</h3>
              <p>
                Learn MongoDB, Express.js, React, and Node.js to build complete
                end-to-end web applications.
              </p>
            </div>

            <div className={Style.card}>
              <h3>🤖 AI Integration</h3>
              <p>
                Integrate AI features like Chatbots, Recommendation Systems,
                Text Summarization, and Automation using modern AI APIs.
              </p>
            </div>

            <div className={Style.card}>
              <h3>💼 Career-Focused Skills</h3>
              <p>
                Gain real-world project experience and industry-ready skills
                required for modern Full Stack & AI developer roles.
              </p>
            </div>
          </div>

          <button className={Style.cta} onClick={() => redirect.push("/sign-up")}>Get Started Today</button>
        </div>
      </div>
    </>
  );
}
