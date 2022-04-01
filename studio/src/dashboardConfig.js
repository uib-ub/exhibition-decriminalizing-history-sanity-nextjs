export default {
  widgets: [
    {
      name: 'project-users',
      layout: {
        height: 'auto'
      }
    },
    {
      name: 'project-info',
      layout: {
        height: 'auto',
        width: 'small'
      },
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/seidhr/muna',
            category: 'Code',
          },
          {
            title: 'Web',
            value: 'https://decriminalizing-history.vercel.app',
            category: 'Links',
          },
          {
            title: 'Studio',
            value: 'https://decriminalizing-history.vercel.app/studio',
            category: 'Links',
          },
        ],
      },
    },
  ],
}
