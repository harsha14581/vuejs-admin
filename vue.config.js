module.exports = { 
  //publicPath: process.env.NODE_ENV === 'production' ? '/demo/star-admin-vue/preview/' : '/' ,
  lintOnSave: false,
  chainWebpack: config => config.resolve.symlinks(false)
}