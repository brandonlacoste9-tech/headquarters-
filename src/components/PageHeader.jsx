import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PageHeader = ({ eyebrow, title, titleAccent, subtitle, children }) => (
  <header className="corp-header">
    <Link to="/" className="btn btn-outline corp-back">
      <ArrowLeft size={14} aria-hidden="true" /> Back to Hub
    </Link>

    <div className="corp-header-main">
      <div className="corp-header-text">
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h1 className="corp-title">
          {title}
          {titleAccent && <> <span className="text-gradient">{titleAccent}</span></>}
        </h1>
        {subtitle && <p className="corp-subtitle">{subtitle}</p>}
      </div>
      {children && <div className="corp-header-aside">{children}</div>}
    </div>
  </header>
);

export default PageHeader;