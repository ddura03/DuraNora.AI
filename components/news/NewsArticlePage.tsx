import Image from "next/image";
import Link from "next/link";
import { ModelLogo } from "@/components/ModelLogo";
import { MODELS_CATALOG } from "@/lib/models-catalog";
import { getRelatedNews, newsImage } from "@/lib/news-utils";
import type { NewsItem } from "@/lib/types";

function RelatedCard({ n }: { n: NewsItem }) {
  const img = n.company ? newsImage(n.company) : null;
  return (
    <Link href={`/news/${n.id}`} className="ncard">
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
    </Link>
  );
}

function ArticleBody({ item }: { item: NewsItem }) {
  const body = item.body;
  if (!body) {
    return <p>{item.excerpt}</p>;
  }

  const subMap = new Map((body.subheadings ?? []).map((s) => [s.after, s.text]));
  const pullAfter = body.pullQuoteAfter ?? -1;

  return (
    <div className="news-article-body">
      {body.paragraphs.map((text, i) => (
        <div key={i}>
          {subMap.has(i) ? <h3>{subMap.get(i)}</h3> : null}
          <p>{text}</p>
          {body.pullQuote && i === pullAfter ? (
            <blockquote className="news-article-pull">{body.pullQuote}</blockquote>
          ) : null}
        </div>
      ))}
    </div>
  );
}

type Props = { item: NewsItem };

export function NewsArticlePage({ item }: Props) {
  const heroImg = item.company ? newsImage(item.company) : null;
  const related = getRelatedNews(item.id!, 3);
  const catalog = item.modelSlug ? MODELS_CATALOG[item.modelSlug] : undefined;

  return (
    <div className="wf news-article-page">
      <div className="news-article-wrap">
        <Link href="/news" className="news-article-back">
          ← Back to Newswire
        </Link>

        <div className="news-article-layout">
          <article className="news-article-main">
            <span className="news-article-cat">{item.cat.toUpperCase()}</span>
            <h1 className="news-article-title">{item.title}</h1>

            <div className="news-article-hero">
              {heroImg ? (
                <Image src={heroImg} alt="" fill style={{ objectFit: "cover" }} unoptimized priority />
              ) : null}
            </div>

            <ArticleBody item={item} />
          </article>

          <aside className="news-article-sidebar">
            <div className="news-article-card">
              <div className="news-article-card-head">
                {item.mark && item.mark !== "§" ? (
                  <span className="glyph news-article-glyph">
                    <ModelLogo mark={item.mark} size={36} />
                  </span>
                ) : (
                  <span className="glyph news-article-glyph">§</span>
                )}
                <div>
                  <div className="news-article-company">{item.company}</div>
                  <div className="news-article-date">{item.date}</div>
                </div>
              </div>
              <div className="news-article-meta">
                {item.read} read · {item.cat}
              </div>
              {item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-article-source"
                >
                  ↗ Read {item.company}&apos;s announcement
                </a>
              ) : null}
              {item.topics && item.topics.length > 0 ? (
                <div className="news-article-topics">
                  {item.topics.map((t) => (
                    <span key={t} className="news-article-topic">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {catalog && item.modelSlug ? (
              <Link href={`/learn/${item.modelSlug}`} className="news-article-learn">
                <div className="news-article-learn-label">Learn the model behind this</div>
                <div className="news-article-learn-cta">
                  Learn {catalog.name} →
                </div>
              </Link>
            ) : null}
          </aside>
        </div>

        <section className="news-article-related">
          <h2>More from the Newswire</h2>
          <div className="news-article-related-grid">
            {related.map((n) => (
              <RelatedCard key={n.id} n={n} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
