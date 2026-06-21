"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VALUES = [
  { n: "01", t: "Clarity over hype", d: "The AI conversation is full of noise. We teach what each tool actually does — and what it can't — without the breathless marketing." },
  { n: "02", t: "Hands-on, not theory", d: "You learn AI by using it. Every lesson is a short video plus a prompt you can run yourself, today." },
  { n: "03", t: "Stay current", d: "The field moves weekly. Our lessons and newswire update as models ship, so what you learn doesn't go stale." },
  { n: "04", t: "Tools, not magic", d: "Models are instruments in a toolbox. We show you which to reach for, and how to combine them." },
  { n: "05", t: "Know it back", d: "AI already knows a lot about you. Understanding how it works is how you stay in control of the relationship." },
  { n: "06", t: "For everyone", d: "From total beginners to power users — the curriculum meets you where you are and takes you further." },
];

export function AboutPageContent() {
  const router = useRouter();

  return (
    <div className="wf">
      <div className="about-hero">
        <div className="inner">
          <div className="kicker">◆ About DuraNoia</div>
          <h1>
            We help people understand the AI <em><br />that already understands them.</em>
          </h1>
          <div className="sub">DuraNoia is a field guide to modern AI — hands-on lessons, ecosystem maps, and a daily newswire that turn the overwhelming pace of AI into something you can actually keep up with.</div>
        </div>
      </div>
      <div className="sec">
        <div className="mission">
          <div>
            <div className="kicker">Our mission</div>
            <h2>Turn AI anxiety into AI fluency.</h2>
            <p>
              Most people&apos;s relationship with AI is one-sided: the models learn everything about us, while we barely understand them. That gap breeds the low-grade unease the name <strong>DuraNoia</strong> plays on.
            </p>
            <p>We close that gap. Pick any of the ten models shaping how we work, and we&apos;ll teach you what it&apos;s good at, where it falls short, and how to chain it with the others to actually get things done.</p>
          </div>
          <div className="quote">&quot;The AI knows you. Now know it back.&quot;</div>
        </div>
      </div>
      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="origin">
          <div className="kicker">Why &quot;DuraNoia&quot;?</div>
          <div className="big" style={{ marginTop: 10 }}>
            <span className="a">Dura</span>
            <span className="b">Noia</span>
          </div>
          <div style={{ fontSize: 18, color: "var(--ink)", lineHeight: 1.55, marginTop: 16, maxWidth: "60ch" }}>
            A nod to the quiet paranoia of living alongside systems that know us better than we know them — flipped into something durable and empowering. The cure for that unease isn&apos;t fear. It&apos;s understanding.
          </div>
          <div className="row">
            <div className="chip">
              <div className="t">Dura —</div>
              <div className="d">durable, lasting know-how that outlives the hype cycle</div>
            </div>
            <div className="chip">
              <div className="t">Noia —</div>
              <div className="d">from paranoia: the instinct to question what AI is really doing</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="kicker">The founder</div>
        <h2 style={{ fontSize: 30, letterSpacing: "-.02em", margin: "8px 0 24px" }}>Built by someone learning in public.</h2>
        <div className="founder">
          <div className="photo">
            <Image src="/founder-headshot.jpg" alt="Daniel Dura" width={200} height={200} unoptimized />
            <div className="ring" />
          </div>
          <div>
            <h2>Daniel Dura</h2>
            <div className="role">Founder &amp; Creator</div>
            <p>I started DuraNoia because keeping up with AI felt like a second job — and most resources were either too shallow or too academic. I wanted one place that taught the tools honestly, showed how they fit together, and stayed current as the field moved.</p>
            <p>
              If that resonates, you&apos;re exactly who this is for. Learn the models, chain them together, and stop feeling like AI is happening <em>to</em> you.
            </p>
            <div className="socials">
              <a href="https://www.linkedin.com/in/daniel-dura03/" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a style={{ cursor: "pointer" }}>X / Twitter ↗</a>
              <a style={{ cursor: "pointer" }}>YouTube ↗</a>
            </div>
          </div>
        </div>
      </div>
      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="cta">
          <h2>Ready to know it back?</h2>
          <p>Start with any of the ten most-used AI models. Free to begin, no account required.</p>
          <div className="btns">
            <span className="btn solid" onClick={() => router.push("/learn")}>
              Explore the models →
            </span>
            <span className="btn ghost" onClick={() => router.push("/ecosystem")}>
              See the ecosystem
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
