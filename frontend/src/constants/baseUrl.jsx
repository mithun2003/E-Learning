const Debug = false;
let baseUrl;
let wsUrl;
if (Debug) {
  baseUrl = 'http://localhost:8000';
  wsUrl = 'ws://localhost:8000';
} else {
    baseUrl = 'https://studypoint.shop';
    wsUrl = 'wss://studypoint.shop';
}

export { baseUrl,wsUrl };
