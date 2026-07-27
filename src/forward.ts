// export interface Env {
  // // ASSETS binding is automatically injected by Cloudflare when configured in wrangler.toml
  // ASSETS: {
    // fetch: (request: Request) => Promise<Response>;
  // };
// }

export default {
	async fetch(request): Promise<Response> {
		
      try {
        // Forward the request to the ASSETS binding
        return await env.ASSETS.fetch(request);
      } catch (err) {
        console.error("Error fetching asset:", err);
        return new Response("Asset not found", { status: 404 });
      }

	}
}
