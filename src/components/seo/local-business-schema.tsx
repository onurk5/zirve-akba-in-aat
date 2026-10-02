export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": "Zirve Akbaş İnşaat",
    "image": "https://zirveakbas.com.tr/logo.png",
    "@id": "https://zirveakbas.com.tr",
    "url": "https://zirveakbas.com.tr",
    "telephone": "+902125550000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Fenerbahçe Mah. Kalamış Cad. No:12",
      "addressLocality": "Kadıköy",
      "addressRegion": "İstanbul",
      "postalCode": "34726",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.9785,
      "longitude": 29.0435
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
