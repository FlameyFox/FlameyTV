export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  return { tmdbAPI: config.public.tmdbAPI };
});