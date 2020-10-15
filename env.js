import Hold from './models/Hold';

let initialHodls = [];
for (let i = 0; i < 198; i++) {
  initialHodls.push(new Hold(i, false, 2));
}

const variables = {
  numOfLeds: 198,
  holds: initialHodls,
};

export default variables;
