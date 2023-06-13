const Debug = true;
let baseUrl;
let wsUrl;
if (Debug) {
  baseUrl = 'http://localhost:8000';
  wsUrl = 'ws://localhost:8000';
} else {
    baseUrl = 'https://e-learning003.netlify.app';
    wsUrl = 'wss://studypoint.shop';
}

export { baseUrl,wsUrl };
