import { createApp } from '@/app.js';
import { env } from '@/config/env.js';

const PORT = env.BACKEND_PORT;
const app = createApp();

app.listen(PORT, () => {
  process.stdout.write(`Backend listening on port ${PORT}\n`);
});
