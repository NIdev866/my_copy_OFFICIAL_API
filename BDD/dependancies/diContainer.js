'use strict';

const fnArgs = require('parse-fn-args');

module.exports = ()=>{
  const dependancies = {};
  const factories = {};
  const diContainer = {};

  diContainer.factory = (name, factory) => {
    factories[name] = factory;
  }
  diContainer.register = (name, dep) => {
    dependancies[name] = dep;
  }
  diContainer.get = (name) =>{
    if(!dependancies[name]){
      const factory = factories[name];
      dependancies[name] = factory && diContainer.inject(factory);
      if(!dependancies[name]){
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependancies[name];
  }
  diContainer.inject = (factory) => {
    const args = fnArgs(factory).map(dependancy => diContainer.get(dependancy));
    return factory.apply(null, args);
  }

  return diContainer;
}
