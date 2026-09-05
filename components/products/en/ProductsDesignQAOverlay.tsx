"use client";

type ProductsDesignQAOverlayProps = {
  opacity?: number;
};

/**
 * Development-only golden reference overlay for visual calibration.
 * Enable: /en/products?designQA=1&designOpacity=40
 */
export function ProductsDesignQAOverlay({ opacity = 0.4 }: ProductsDesignQAOverlayProps) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div
      className="en-products-design-qa"
      aria-hidden="true"
      style={{ "--design-qa-opacity": String(opacity) } as React.CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/products/en/golden-reference-overlay.png"
        alt=""
        className="en-products-design-qa__image"
      />
      <div className="en-products-design-qa__badge">
        Design QA overlay · {Math.round(opacity * 100)}% · ?designQA=1
      </div>
    </div>
  );
}
