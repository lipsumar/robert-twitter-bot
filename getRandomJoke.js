const sample = require('lodash.sample')
const axios = require('axios');
const automotronClient = axios.create({
  baseURL: 'https://automotron-v2.lipsumar.io'
})

async function getGenerators(){
  const resp = await  automotronClient.get(`/api/generators?userId=L5nZJuH9A`)
  return resp.data
}

async function runGenerator(generatorId){
  const resp = await automotronClient.get(`/api/generators/${generatorId}/run`)
  return resp.data
}

async function getRandomJoke(){
  const generators = await getGenerators();
  const generator = sample(generators);
  const generated = await runGenerator(generator._id);
  return generated.text;
}

module.exports = getRandomJoke;