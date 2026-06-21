// App shell — renders the Workspace direction for the model detail page.
// The other exploration variants (V1/V2/V4) have been removed.

function ModelPageApp() {
  return (
    <div className="page">
      <ModelPageV3 />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ModelPageApp />);
