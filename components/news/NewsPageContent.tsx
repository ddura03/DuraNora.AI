"use client";

import Image from "next/image";
import { useState } from "react";
import { NEWS_CATS, NEWS_ITEMS } from "@/lib/news";
import type { NewsItem } from "@/lib/types";
import { ModelLogo } from "@/components/ModelLogo";

function newsImage(company: string) {
  const map: Record<string, string> = {
    OpenAI: "/logos/news-openai.png",
    Anthropic: "/logos/news-anthropic.png",
    Google: "/logos/news-google.png",
    xAI: "/logos/news-xai.png",
    DeepSeek: "/logos/news-deepseek.png",
    Perplexity: "/logos/news-perplexity.png",
    Meta: "/logos/news-meta.png",
    Policy: "/logos/news-eu.png",
    Cursor: "/logos/news-cursor.png",
    Midjourney: "/logos/news-midjourney.png",
  };
  return map[company];
}

function NewsCard({ n }: { n: NewsItem }) {
  const img = n.company ? newsImage(n.company) : null;
  return (
    <div className="ncard">
      <div className="nimg">
        {img ? <Image src={img} alt={n.company || ""} fill style={{ objectFit: "cover" }} unoptimized /> : null}
        <div className="co">
          {n.mark && n.mark !== "§" ? (
            <span className="glyph g" style={{ width: 20, height: 20, fontSize: 10 }}>
              <ModelLogo mark={n.mark} />
            </span>
          ) : null}
          {n.company}
        </div>
      </div>
      <div className="nbody">
        <div className="nmeta">
          <b>{n.cat}</b>
          <span>{n.date}</span>
        </div>
        <h3>{n.title}</h3>
        <div className="nex">{n.excerpt}</div>
        <div className="nread">
          <span className="read-link">
            READ <span className="arr">→</span>
          </span>
          <span style={{ color: "var(--muted)", fontWeight: 400, marginLeft: "auto" }}>{n.read}</span>
        </div>
      </div>
    </div>
  );
}

export function NewsPageContent() {
  const [cat, setCat] = useState("All");
  const featured = NEWS_ITEMS.find((n) => n.featured) || NEWS_ITEMS[0];
  const rest = NEWS_ITEMS.filter((n) => n !== featured);
  const list = cat === "All" ? rest : rest.filter((n) => n.cat === cat);
  const featuredImg = featured.company ? newsImage(featured.company) : null;

  return (
    <div className="wf news-page">
      <div className="news-hero">
        <div className="super">
          <span className="live" />
          The Newswire · updated daily
        </div>
        <h1>
          What the labs <em>shipped today.</em>
        </h1>
        <div className="sub">Model releases, funding, research, and policy — straight from the AI companies, summarized so you can keep up in five minutes.</div>
      </div>
      <div className="sec">
        <div className="featured" style={{ marginBottom: 28 }}>
          <div className="img">
            {featuredImg ? <Image src={featuredImg} alt="" fill style={{ objectFit: "cover" }} unoptimized /> : null}
            <span className="tag">★ FEATURED · {featured.cat.toUpperCase()}</span>
          </div>
          <div className="body">
            <div className="meta">
              {featured.mark && featured.mark !== "§" ? (
                <span className="glyph" style={{ width: 30, height: 30, fontSize: 14 }}>
                  <ModelLogo mark={featured.mark} />
                </span>
              ) : null}
              <div>
                <div style={{ fontWeight: 700, fontSize: 13.5 }}>{featured.company}</div>
                <div className="label">
                  {featured.date} · {featured.read} read
                </div>
              </div>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="more">
              Read the full story <span className="ar">→</span>
            </span>
          </div>
        </div>
        <div className="filters">
          <div className="chips">
            {NEWS_CATS.map((c) => (
              <span key={c} className={"chip" + (c === cat ? " is-on" : "")} onClick={() => setCat(c)}>
                {c}
              </span>
            ))}
          </div>
          <span className="label">
            {list.length} stor{list.length === 1 ? "y" : "ies"}
          </span>
        </div>
        <div className="news-page-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {list.map((n) => (
            <NewsCard key={n.id} n={n} />
          ))}
        </div>
        <div className="nl">
          <div>
            <h3>One short brief, every Friday.</h3>
            <p>The week&apos;s AI news, summarized. No hype, no doom — just what changed and why it matters.</p>
          </div>
          <div className="form">
            <input placeholder="you@domain.com" />
            <button type="button">Subscribe →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
