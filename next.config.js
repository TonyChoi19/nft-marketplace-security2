/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URL:
      'mongodb+srv://admin:admin@cluster0.gxdik.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  },
}
