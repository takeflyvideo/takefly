import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import LoadingScreen from "@/components/loading-screen";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PortfolioSection from "@/components/portfolio-section";
import VideoSection from "@/components/video-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AdminAnalytics from "@/components/admin-analytics";
import SEOHelmet from "@/components/seo-helmet";

export default function Home() {
  const trackPageViewMutation = useMutation({
    mutationFn: async (data: { page: string; userAgent: string; sessionId: string }) => {
      return apiRequest("POST", "/api/analytics/track", data);
    },
  });

  useEffect(() => {
    // Track page view
    const sessionId = sessionStorage.getItem("sessionId") || 
      (() => {
        const id = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem("sessionId", id);
        return id;
      })();

    trackPageViewMutation.mutate({
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      sessionId,
    });
  }, []);

  return (
    <>
      <SEOHelmet />
      <LoadingScreen />
      <Navigation />
      <HeroSection />
      <PortfolioSection />
      <VideoSection />
      <ContactSection />
      <Footer />
      <AdminAnalytics />
    </>
  );
}
