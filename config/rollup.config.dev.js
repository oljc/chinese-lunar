import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const name = 'chineselunar';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name,
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    serve({
      open: true,
      openPage: '/example/index.html',
      contentBase: '.',
      port: '8888',
    }),
    livereload({
      watch: 'dist',
    }),
    commonjs(),
    typescript({
      compilerOptions: {
        declaration: true,
        declarationDir: 'types',
        emitDeclarationOnly: true,
      },
    }),
  ],
};
