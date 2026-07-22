import { SITE } from "@/config/site";

/**
 * JSON-LD for the organisation and the product.
 *
 * Deliberately omits `aggregateRating`, `review` and any user/customer counts —
 * those would be fabricated social proof, which this site does not use.
 * `offers` is omitted too, because pricing is genuinely on request.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}#organization`,
        name: SITE.legalName,
        url: SITE.url,
        email: SITE.contactEmail,
        areaServed: { "@type": "Country", name: "United Arab Emirates" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}#organization` },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: SITE.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "CRM",
        operatingSystem: "Web",
        description: SITE.description,
        publisher: { "@id": `${SITE.url}#organization` },
        featureList: [
          "Trakheesi permit tracking with an enforced publish gate",
          "Speed-to-lead SLA tracking with auto-drop and a shared claim pool",
          "RERA forms A, A2, B, I, F and U",
          "Commission splits with internal and external co-broke and 5% VAT",
          "Campaign agent-pool rotation and UTM attribution",
          "Role-based access with over 60 granular permission keys",
          "Append-only audit log",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled content — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
