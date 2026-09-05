"use client";



import Image from "next/image";

import Link from "next/link";

import { useEffect, useId, useRef, type CSSProperties } from "react";

import { createPortal } from "react-dom";

import { useLocale } from "@/components/i18n/LocaleProvider";

import { ProductSystemIconSvg } from "@/components/products/en/ProductSystemIcons";

import { getProductsHubUiCopy } from "@/lib/products/hub-ui-copy";

import { getProductModalContent } from "@/lib/products/product-modal-content";

import type { ProductSystem } from "@/lib/products/en-product-systems";

import { routes } from "@/lib/config/routes";



type ProductSystemDetailModalProps = {

  system: ProductSystem;

  open: boolean;

  onClose: () => void;

};



export function ProductSystemDetailModal({ system, open, onClose }: ProductSystemDetailModalProps) {

  const titleId = useId();

  const closeRef = useRef<HTMLButtonElement>(null);

  const { locale, path: localePath } = useLocale();

  const ui = getProductsHubUiCopy(locale);

  const detail = getProductModalContent(system.slug, locale);



  useEffect(() => {

    if (!open) return;



    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeRef.current?.focus();



    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === "Escape") onClose();

    };



    window.addEventListener("keydown", onKeyDown);

    return () => {

      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKeyDown);

    };

  }, [open, onClose]);



  if (!open || typeof document === "undefined") return null;



  return createPortal(

    <div

      className="en-product-modal"

      role="dialog"

      aria-modal="true"

      aria-labelledby={titleId}

      style={

        {

          "--ps-accent": system.accent,

          "--ps-accent-muted": system.accentMuted,

        } as CSSProperties

      }

    >

      <button

        type="button"

        className="en-product-modal__backdrop"

        aria-label={ui.modal.closeDetails}

        onClick={onClose}

      />



      <div className="en-product-modal__shell">

        <button

          ref={closeRef}

          type="button"

          className="en-product-modal__close"

          aria-label={ui.modal.close}

          onClick={onClose}

        >

          ×

        </button>



        <div className="en-product-modal__grid">

          <div className="en-product-modal__visual">

            <div className="en-product-modal__visual-glow" aria-hidden="true" />

            <Image

              src={system.image}

              alt={system.imageAlt}

              width={system.imageWidth}

              height={system.imageHeight}

              className="en-product-modal__image"

              sizes="(min-width: 1024px) 60vw, 100vw"

              priority

            />

            <div className="en-product-modal__visual-badge">

              <ProductSystemIconSvg name={system.icon} className="en-product-modal__visual-icon" />

              <span>{system.number}</span>

              <strong>{system.name}</strong>

            </div>

          </div>



          <div className="en-product-modal__content">

            <p className="en-product-modal__eyebrow">{system.eyebrow}</p>

            <h2 id={titleId} className="en-product-modal__title">

              {detail?.productTitle ?? system.title}

            </h2>

            <p className="en-product-modal__lead">{detail?.overview ?? system.description}</p>



            <ul className="en-product-modal__tags">

              {system.tags.map((tag) => (

                <li key={tag}>{tag}</li>

              ))}

            </ul>



            {detail && detail.advantages.length > 0 ? (

              <section className="en-product-modal__block">

                <h3>{ui.modal.technicalAdvantages}</h3>

                <ul>

                  {detail.advantages.map((item) => (

                    <li key={item}>{item}</li>

                  ))}

                </ul>

              </section>

            ) : null}



            {detail && detail.applications.length > 0 ? (

              <section className="en-product-modal__block">

                <h3>{ui.modal.typicalApplications}</h3>

                <ul>

                  {detail.applications.map((item) => (

                    <li key={item}>{item}</li>

                  ))}

                </ul>

              </section>

            ) : null}



            <dl className="en-product-modal__specs">

              {system.specs.map((spec) => (

                <div key={spec.label} className="en-product-modal__spec">

                  <dt>{spec.label}</dt>

                  <dd>{spec.value}</dd>

                </div>

              ))}

            </dl>



            {detail?.standardsNote ? (

              <section className="en-product-modal__note">

                <h3>{ui.modal.standardsCompliance}</h3>

                <p>{detail.standardsNote}</p>

              </section>

            ) : null}



            {detail?.qualityNote ? (

              <section className="en-product-modal__note">

                <h3>{ui.modal.qualityControl}</h3>

                <p>{detail.qualityNote}</p>

              </section>

            ) : null}



            <div className="en-product-modal__actions">

              <Link href={localePath(routes.requestQuote.path)} className="en-product-modal__cta-primary">

                {ui.modal.requestQuote}

              </Link>

              <button type="button" className="en-product-modal__cta-secondary" onClick={onClose}>

                {ui.modal.backToSystems}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>,

    document.body,

  );

}


