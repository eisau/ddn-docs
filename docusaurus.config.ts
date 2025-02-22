import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

require('dotenv').config();

const config: Config = {
  title: 'Hasura GraphQL Docs',
  tagline: 'Instant GraphQL on all your data',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://hasura.io',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.CF_PAGES === '1' ? '/' : '/docs/3.0',
  trailingSlash: true,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hasura', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  staticDirectories: ['static', 'public'],

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    docsBotEndpointURL: (() => {
      if (process.env.CF_PAGES === '1') {
        return 'wss://website-api.stage.hasura.io/chat-bot/hasura-docs-ai';
      } else {
        switch (process.env.release_mode) {
          case 'development':
            return 'ws://localhost:8000/hasura-docs-ai';
          case 'production':
            return 'wss://website-api.hasura.io/chat-bot/hasura-docs-ai';
          case 'staging':
            return 'wss://website-api.stage.hasura.io/chat-bot/hasura-docs-ai';
          default:
            return 'ws://localhost:8000/hasura-docs-ai'; // default to development if no match
        }
      }
    })(),
    hasuraVersion: 3,
    DEV_TOKEN: process.env.DEV_TOKEN,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          editUrl: ({ docPath }) => `https://github.com/hasura/ddn-docs/edit/main/docs/${docPath}`,
          breadcrumbs: true,
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v3.x',
              badge: true,
            },
          },
          sidebarCollapsible: true,
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        googleTagManager: {
          containerId: 'GTM-PF5MQ2Z',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'wiki',
        path: 'wiki',
        routeBasePath: 'wiki',
        exclude: ['**/*.wip'],
        // sidebarPath: './sidebarsCommunity.js',
        // ... other options
      },
    ],
    async function tailwind(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/og-social-card.jpg',
    algolia: {
      appId: '7M3BTIV34B',
      // Public API key: it is safe to commit it
      apiKey: '10f3d9d2cd836eec903fcabbd6d50139',
      indexName: 'hasura',
    },
    announcementBar: {
      id: 'announcementBar-5', // Increment on change
      content: `This is the documentation for Hasura DDN, the future of data delivery. <a target="_blank" rel="noopener noreferrer" href="https://hasura.io/docs/latest/index/">Click here for the Hasura v2.x docs</a>.`,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Hasura Logo',
        src: 'img/logo-dark.svg',
        href: '/index',
        srcDark: '/img/logo-light.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              href: 'https://hasura.io/docs/2.0/index/',
              label: 'v2.x',
            },
            {
              href: 'https://hasura.io/docs/1.0/graphql/core/index.html',
              label: 'v1.x',
            },
          ],
        },
        // {
        //   type: 'search',
        //   position: 'left',
        // },
        {
          to: 'https://hasura.io/',
          label: 'Hasura.io',
          position: 'right',
        },
        // {
        //   to: 'https://cloud.hasura.io/login',
        //   label: 'Log In',
        //   position: 'right',
        // },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'typescript', 'bash', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
