// App shell for the News page.
function NewsApp() {
  return (
    <div className="page">
      <NewsPage />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<NewsApp />);
