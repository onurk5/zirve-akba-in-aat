# Cloudflare Tunnel HMR Issues

When using `cloudflared tunnel` to expose a Next.js development server (`npm run dev`) to the internet (e.g., for mobile testing):
- The Next.js Hot Module Replacement (HMR) WebSocket (`_next/hmr`) frequently drops or fails to connect over Cloudflare Quick Tunnels, resulting in `Failed to fetch` or `WebSocket connection failed` console errors.
- **Rule:** If the user reports a `Failed to fetch` or `_next/hmr` WebSocket error, DO NOT just tell them to refresh. You MUST automatically kill both the Next.js dev server task and the Cloudflare tunnel task using `manage_task`, restart both of them, and then provide the user with the newly generated `trycloudflare.com` URL. This is the only reliable way to clear the broken WebSocket state.
- **Rule 2:** Always warn the user that because they are testing via a free Cloudflare Quick Tunnel, background WebSocket disconnections are normal and expected after some idle time or during heavy reloads.
