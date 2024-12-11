import Controller from './Controller/Controller.js';

class App {
  async run() {
    await Controller.processPlan();
  }
}

export default App;
