import { useEffect } from "react";

export default function SEOHelmet() {
  useEffect(() => {
    // Update document title
    document.title = "TakeFly - Portfólio de Imagens Aéreas | Drone Photography";
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", "TakeFly - Portfólio profissional de fotografia e vídeos aéreos com drone. Capturamos momentos únicos do alto. Rio de Janeiro.");
    updateMetaTag("keywords", "drone, fotografia aérea, vídeos aéreos, Rio de Janeiro, TakeFly, cinematografia");
    updateMetaTag("author", "TakeFly");
    updateMetaTag("robots", "index, follow");

    // Open Graph tags
    updatePropertyTag("og:title", "TakeFly - Portfólio de Imagens Aéreas");
    updatePropertyTag("og:description", "Capturamos momentos únicos do alto dos céus com fotografia e vídeos aéreos profissionais no Rio de Janeiro.");
    updatePropertyTag("og:type", "website");
    updatePropertyTag("og:url", window.location.href);
    updatePropertyTag("og:site_name", "TakeFly");
    updatePropertyTag("og:locale", "pt_BR");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", "TakeFly - Portfólio de Imagens Aéreas");
    updateMetaTag("twitter:description", "Capturamos momentos únicos do alto dos céus com fotografia e vídeos aéreos profissionais.");

    // Schema.org structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "TakeFly",
      "description": "Portfólio profissional de fotografia e vídeos aéreos com drone",
      "url": window.location.href,
      "telephone": "11920566022",
      "email": "takeflyvideo@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rio de Janeiro",
        "addressRegion": "RJ",
        "addressCountry": "BR"
      },
      "sameAs": [
        "https://instagram.com/takeflyvideo"
      ],
      "serviceType": ["Fotografia Aérea", "Vídeo Aéreo", "Cinematografia com Drone"]
    });
    document.head.appendChild(script);

    return () => {
      // Cleanup script tag on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
