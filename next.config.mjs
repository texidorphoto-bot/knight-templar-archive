/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // pdfjs-dist v5 modern build calls `new DOMMatrix()` at module init,
    // crashing the Next.js static-generation worker. The legacy build is the
    // Node.js-compatible variant the package itself recommends for non-browser
    // environments.
    config.resolve.alias["pdfjs-dist"] = "pdfjs-dist/legacy/build/pdf.mjs";
    return config;
  },
};

export default nextConfig;
