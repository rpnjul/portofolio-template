import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
    return {
      id: "/",
      name: "Satria Aprilian Profile",
      short_name: "Satria Aprilian",
      description: "Full-Stack Web Developer - Satria Aprilian",
      lang: "en-EN",
      scope: "/",
      start_url: "/?app=pwa",
      display_override: ["fullscreen", "minimal-ui", "window-controls-overlay"],
      display: "standalone",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      prefer_related_applications: false,
      dir: "ltr",
      related_applications: [],
      shortcuts: [
            {
                name: "Satria Aprilian Profile",
                short_name: "Satria Aprilian",
                description: "Full-Stack Web Developer - Satria Aprilian",
                url: "/",
                icons: [
                    {
                        src: "/assets/img/favicon/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/assets/img/favicon/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                ],
            },
        ],
        icons: [
            {
              src: "/assets/img/favicon/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose:"any"
            },
            {
              src: "/assets/img/favicon/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose:"any"
            },
          ],
    };
}