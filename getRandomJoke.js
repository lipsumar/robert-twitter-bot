const sample = require('lodash.sample')
const axios = require('axios');
const automotronClient = axios.create({
  baseURL: process.env.AUTOMOTRON_BASE_URL
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
  const generator = sample(generators.filter(g => g._id !== '1LlENwJRk'));
  const generated = await runGenerator(generator._id);
  return generated.text;
}

module.exports = getRandomJoke;