// App shell — renders the chosen HUD Overlay wireframe (V2) and exposes
// copy + display tweaks. The earlier exploration variants (V1/V3/V4) are
// no longer loaded.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "The AI knows you.\nNow know it back.",
  "subhead": "Hands-on lessons for the models shaping how we work. Pick one to begin.",
  "showAnnotations": true,
  "compact": false,
  "sketchy": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync the global --accent to the brand violet so light sections tint to match.
  React.useEffect(() => {
    const id = "tweak-style-overrides";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    let css = `:root{ --accent:#7c3aed; }`;
    if (!t.showAnnotations) {
      css += `.annot, .sec-note, .sec-tag, .wf-meta, .label, .crumbs { display:none !important; }`;
    }
    if (t.compact) {
      css += `.wf-body{padding:10px !important} .sec{margin-bottom:10px !important} .feat-card{min-height:240px !important; padding:16px !important}`;
    }
    if (!t.sketchy) {
      css += `
        .ai-btn, .feat-card, .news-card, .sec, .video-ph, .v2-hero, .wf {
          box-shadow:none !important;
        }
        .ai-btn, .sec, .feat-card, .news-card, .video-ph, .wf, .v2-hero {
          border-style:solid !important;
        }
        .annot, .sec-note { color: var(--ink-2) !important; transform:none !important; font-family: var(--mono) !important; font-size: 11px !important; }
      `;
    }
    el.textContent = css;
  }, [t.showAnnotations, t.compact, t.sketchy]);

  return (
    <div className="app">
      <WireframeV2 headline={t.headline} subhead={t.subhead} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Copy" />
        <TweakText
          label="Headline"
          value={t.headline}
          onChange={(v) => setTweak("headline", v)}
        />
        <TweakText
          label="Subhead"
          value={t.subhead}
          onChange={(v) => setTweak("subhead", v)}
        />

        <TweakSection label="Display" />
        <TweakToggle label="Show notes & labels" value={t.showAnnotations} onChange={(v) => setTweak("showAnnotations", v)} />
        <TweakToggle label="Sketchy shadows"     value={t.sketchy}         onChange={(v) => setTweak("sketchy", v)} />
        <TweakToggle label="Compact density"     value={t.compact}         onChange={(v) => setTweak("compact", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
