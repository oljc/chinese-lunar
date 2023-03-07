import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'CLunar',
  themeConfig: {
    logo: '/public/logo.png',
    siteTitle: 'CLunar官方中文文档',

    nav: [{ text: '文档', link: '/guide/installation' }],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LIjiAngChen8/chinese-lunar' },
    ],

    sidebar: {
      '/guild/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guild/installation',
            },
            {
              text: '快速开始',
              link: '/guild/quickstart',
            },
          ],
        },
      ],
    },
  },
});
