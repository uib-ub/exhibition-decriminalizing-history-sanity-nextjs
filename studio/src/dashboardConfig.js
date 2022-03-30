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
            title: 'Decriminalizing history',
            value: 'Not deployed',
            category: 'Web',
          },
          {
            title: 'Editor',
            value: 'Not deployed',
            category: 'Studio',
          },
        ],
      },
    },
  ],
}
