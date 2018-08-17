
import randomColor from 'random-color';

const colors = (new Array(20)).fill(0).map(() => randomColor().hexString());

export default colors;
