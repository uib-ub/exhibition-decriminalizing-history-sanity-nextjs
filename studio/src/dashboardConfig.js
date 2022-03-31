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
            title: 'Preview',
            value: 'https://decriminalizing-history.vercel.app',
            category: 'Web',
          },
          {
            title: 'Editor',
            value: 'https://decriminalizing-history.vercel.app/studio',
            category: 'Studio',
          },
        ],
      },
    },
  ],
}
