import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  src?: string;
}

const videoItems: VideoItem[] = [
  {
    id: "1",
    title: "Rio de Janeiro - Vista Aérea",
    description: "Sobrevoe os pontos turísticos mais icônicos do Rio de Janeiro",
    poster: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    src: undefined // TODO: Add actual video URL when available
  },
  {
    id: "2",
    title: "Paisagens Cinematográficas",
    description: "Explore a beleza natural através de perspectivas únicas",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
    src: undefined // TODO: Add actual video URL when available
  }
];

export default function VideoSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handlePlayVideo = (videoId: string) => {
    // TODO: Implement actual video playback functionality
    setPlayingVideo(videoId);
    console.log(`Playing video: ${videoId}`);
  };

  return (
    <section id="videos" className="py-20 px-4 bg-muted" data-testid="video-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 font-serif" data-testid="video-title">
            Vídeos em Movimento
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="video-subtitle">
            Experimente a magia do movimento aéreo através de nossos vídeos cinematográficos
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videoItems.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl overflow-hidden"
              data-testid={`video-player-${video.id}`}
            >
              <div className="aspect-video bg-muted relative">
                <img
                  src={video.poster}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <button
                    onClick={() => handlePlayVideo(video.id)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center transition-all hover-scale"
                    data-testid={`play-button-${video.id}`}
                  >
                    <Play size={24} className="ml-1" />
                  </button>
                </div>
                {playingVideo === video.id && (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <p className="text-white text-lg">Video player would load here</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" data-testid={`video-title-${video.id}`}>
                  {video.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`video-description-${video.id}`}>
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
