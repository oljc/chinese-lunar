import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';

const name = 'chineselunar';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.min.js',
      format: 'umd',
      name: name,
      exports: 'named',
      plugins: [terser()],
      compact: true,
    },
    {
      file: 'lib/index.esm.js',
      format: 'es',
      exports: 'named',
      plugins: [terser()],
      compact: true,
    },
    {
      file: 'types/index.d.ts',
      format: 'es',
    },
  ],
  plugins: [
    commonjs(),
    strip(),
    typescript({
      compilerOptions: {
        declaration: true,
        emitDeclarationOnly: true,
      },
    }),
    filesize(),
  ],
};
