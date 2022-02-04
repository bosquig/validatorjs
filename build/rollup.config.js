import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'src/validator.js', // Jalur relatif to package.json
  output: {
    name: 'validatorjs',
    exports: 'named',
  },
  plugins: [
    commonjs(),
  ],
}
