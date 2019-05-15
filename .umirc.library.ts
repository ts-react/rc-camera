import { IBundleOptions } from 'umi-library/src/types';

const options: IBundleOptions = {
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'camera',
    globals: {
      react: 'React'
    }
  }
};

export default options;
