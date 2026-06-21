"use client";

import Link from "next/link";
import { ModelLogo } from "@/components/ModelLogo";
import { countPairingsForModel, getEcoModel } from "@/lib/ecosystem-utils";
import { MODELS_CATALOG } from "@/lib/models-catalog";

type Props = { modelSlug: string };

export function ModelHubPage({ modelSlug: slug }: Props) {
  const model = getEcoModel(slug);
  const catalog = MODELS_CATALOG[slug];

  if (!model || !catalog) {
    return (
      <div className="wf" style={{ padding: 48 }}>
        <p>Model not found.</p>
        <Link href="/">← Back home</Link>
      </div>
    );
  }

  const lessonCount = catalog.lessons.length;
  const pairingCount = countPairingsForModel(slug);

  return (
    <div className="wf model-hub-page">
      <div className="model-hub-page__inner sec">
        <Link href="/" className="eco-back-link model-hub-page__back">
          <span className="eco-back-link__arr">←</span> Back to home
        </Link>

        <div className="model-hub-page__header">
          <div className="glyph model-hub-page__glyph">
            <ModelLogo mark={model.mark} size={56} />
          </div>
          <div>
            <h1 className="model-hub-page__name">{model.name}</h1>
            <p className="model-hub-page__role">{model.role} · {catalog.by}</p>
          </div>
        </div>

        <p className="model-hub-page__lead">Choose how you want to learn {model.name} — deep video lessons or how it connects in the ecosystem.</p>

        <div className="model-hub-page__cards">
          <Link href={`/learn/${slug}`} className="model-hub-card">
            <div className="model-hub-card__icon">▶</div>
            <div className="model-hub-card__title">Video lessons</div>
            <p className="model-hub-card__desc">Deep-dive courses on prompting, features, and what {model.name} is best at.</p>
            <div className="model-hub-card__meta">{lessonCount} lessons</div>
            <span className="model-hub-card__cta">
              Start learning <span className="eco-forward-link__arr">→</span>
            </span>
          </Link>

          <Link href={`/ecosystem/${slug}`} className="model-hub-card">
            <div className="model-hub-card__icon">◇</div>
            <div className="model-hub-card__title">How it connects</div>
            <p className="model-hub-card__desc">See who {model.name} pairs with and follow tested multi-model workflows.</p>
            <div className="model-hub-card__meta">{pairingCount} pairing{pairingCount !== 1 ? "s" : ""}</div>
            <span className="model-hub-card__cta">
              Explore pairings <span className="eco-forward-link__arr">→</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
