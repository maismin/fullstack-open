const blogs = [
  {
    'title': 'Start Here: Learn HTML Basics',
    'author': 'Kezz Bracey',
    'url': 'https://webdesign.tutsplus.com/courses/start-here-learn-html-basics',
    'likes': 21,
    'user': {
      'username': 'maismin',
      'name': 'Simon Mai',
      'id': '5d1cbbe4742c381821c023d0'
    },
    'id': '5d18d3a7ab7e9e133cc9c22a'
  },
  {
    'title': 'Start Here: Learn CSS Typography',
    'author': 'Kezz Bracey',
    'url': 'https://webdesign.tutsplus.com/courses/start-here-learn-css-typography',
    'likes': 3,
    'user': {
      'username': 'maismin',
      'name': 'Simon Mai',
      'id': '5d1cbbe4742c381821c023d0'
    },
    'id': '5d18e9b6ab7e9e133cc9c22b'
  },
  {
    'title': 'Introduction to SMACSS',
    'author': 'Adi Purdila',
    'url': 'https://webdesign.tutsplus.com/courses/introduction-to-smacss',
    'likes': 13,
    'user': {
      'username': 'maidennis',
      'name': 'Dennis Mai',
      'id': '5d1cbcd1742c381821c023d1'
    },
    'id': '5d18eec02004421cefa80b2a'
  },
  {
    'title': 'Understanding the CSS Box Model',
    'author': 'Craig Campbell',
    'url': 'https://webdesign.tutsplus.com/courses/understanding-the-css-box-model',
    'likes': 20,
    'user': {
      'username': 'maidennis',
      'name': 'Dennis Mai',
      'id': '5d1cbcd1742c381821c023d1'
    },
    'id': '5d18fa5728e11424e66a4661'
  },
  {
    'title': 'CSS Grid Layout: A Quick Start Guidel',
    'author': 'Ian Yates',
    'url': 'https://webdesign.tutsplus.com/tutorials/css-grid-layout-quick-start-guide--cms-27238',
    'likes': 105,
    'user': {
      'username': 'maidennis',
      'name': 'Dennis Mai',
      'id': '5d1cbcd1742c381821c023d1'
    },
    'id': '5d1a976a206bd90ac4904fe1'
  },
  {
    'title': 'Using Slots In Vue.js',
    'author': 'Joseph Zimmerman',
    'url': 'https://www.smashingmagazine.com/2019/07/using-slots-vue-js/',
    'likes': 12,
    'user': {
      'username': 'maismin',
      'name': 'Simon Mai',
      'id': '5d1cbbe4742c381821c023d0'
    },
    'id': '5d1cdf67f0caf64c49066aa7'
  },
  {
    'title': 'How Sitejet Helps Your Agency Design Websites Faster Than Ever',
    'author': 'Suzanne Scacca',
    'url': 'https://www.smashingmagazine.com/2019/07/sitejet-agency-design-websites/',
    'likes': 28,
    'user': {
      'username': 'maismin',
      'name': 'Simon Mai',
      'id': '5d1cbbe4742c381821c023d0'
    },
    'id': '5d1ce41d2b56374ebb2c2a76'
  },
  {
    'title': '20 web design trends for 2019',
    'author': 'John Moore Williams',
    'url': 'https://webflow.com/blog/20-web-design-trends-for-2019',
    'likes': 4,
    'user': {
      'username': 'maismin',
      'name': 'Simon Mai',
      'id': '5d1cbbe4742c381821c023d0'
    },
    'id': '5d1d673fe6f5fd1559f8e7db'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }