/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/learning",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/learning/curious-builders",
        destination: "/workshops/theory",
        permanent: true,
      },
      {
        source: "/learning/curious-builders/:slug*",
        destination: "/workshops/theory",
        permanent: true,
      },
      {
        source: "/try",
        destination: "/workshops/theory",
        permanent: true,
      },
      {
        source: "/try/:slug*",
        destination: "/workshops/theory",
        permanent: true,
      },
      {
        source: "/learning/first-build",
        destination: "/workshops/agentic-project",
        permanent: true,
      },
      {
        source: "/learning/first-build/:slug*",
        destination: "/workshops/agentic-project",
        permanent: true,
      },
      {
        source: "/learning/first-multi-agent-deploy",
        destination: "/workshops/agentic-project",
        permanent: true,
      },
      {
        source: "/learning/first-multi-agent-deploy/:slug*",
        destination: "/workshops/agentic-project",
        permanent: true,
      },
      {
        source: "/learning/foundations-of-ai",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/learning/foundations-of-ai/:path*",
        destination: "/workshops",
        permanent: true,
      },
      {
        source: "/roadmap",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
