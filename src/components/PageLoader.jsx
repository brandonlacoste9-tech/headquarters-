const PageLoader = () => (
  <div className="page-loader" role="status" aria-label="Loading page">
    <div className="page-loader-ring" />
    <span className="page-loader-text">Initializing</span>
  </div>
);

export default PageLoader;