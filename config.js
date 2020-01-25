const config = {
  dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_teleplatzi:db_user_teleplatzi@cluster0-bbagl.mongodb.net/telegrom?retryWrites=true&w=majority',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoutes: process.env.FILES_ROUTE || 'files'
}

module.exports = config;