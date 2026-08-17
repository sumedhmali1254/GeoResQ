import { Link } from "react-router-dom";

export default function HeaderBrand({ variant = "text" }) {
  const logoSrc = variant === "icon" ? "/main-logo.png" : "/text-logo.png";

  return (
    <Link
      to="/"
      className="header-brand flex items-center no-underline min-w-0"
    >
      <img
        src={logoSrc}
        alt="GeoResQ India — Geospatial Disaster Intelligence"
        className={
          variant === "icon"
            ? "header-brand-logo header-brand-logo-icon"
            : "header-brand-logo"
        }
      />
    </Link>
  );
}
