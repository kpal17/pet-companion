import React from "react";

export default function AuthBrand({ logoSrc, title, tagline, className = "" }) {
  return (
    <header className={`signup-brand ${className}`.trim()}>
      <img className="signup-brand__logo" src={logoSrc} alt="" aria-hidden="true" />
      <h1 className="signup-brand__title">{title}</h1>
      <p className="signup-brand__tagline">{tagline}</p>
    </header>
  );
}
