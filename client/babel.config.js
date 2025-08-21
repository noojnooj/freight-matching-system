module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // @ 경로 별칭(@/*)을 쓰려면 이 줄과 아래 설정이 필요함.
      ['module-resolver', { alias: { '@': './' } }],
    ],
  };
};
