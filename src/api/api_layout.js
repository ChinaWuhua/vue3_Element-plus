export default {
  getMenu() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            label: '首页', name: 'home', path: '/home', hide: false,
          }
        ])
      })
    })
  }
}