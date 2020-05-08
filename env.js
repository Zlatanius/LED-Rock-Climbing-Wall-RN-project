import Hold from './models/Hold';

let initialHodls = [];
for (let i = 0; i < 49; i++) {
  initialHodls.push(new Hold(i, false, 2));
}

const variables = {
  numOfLeds: 49,
  holds: initialHodls,
};

export default variables;
