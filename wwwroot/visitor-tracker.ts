// https://geolocation-hello-world-2.zlaski.workers.dev/
// https://github.com/zlaski/geolocation-hello-world-2

// export interface Env {
  // // ASSETS binding is automatically injected by Cloudflare when configured in wrangler.toml
  // ASSETS: {
    // fetch: (request: Request) => Promise<Response>;
  // };
// }

const YOUR_DOMAIN = "sacramento-choo-choo.com"; // Replace with your verified domain
const RECIPIENT_EMAIL = "zlaski@ziemas.net"; // Replace with your email to receive test emails

export default {
	async fetch(request: Request, env: Env): Promise<Response> {

		let html_content = "";
		let html_style =
			"body{padding:1em; font-family: sans-serif;} h1{color:#f6821f;}";

		html_content += "<p> URL: " + request.url + "</p>";
		html_content += "<p> Method: " + request.method + "</p>";
		html_content += "<p> User-Agent: " + request.headers.get("user-agent") + "</p>";
		html_content += "<p> IPv4: " + request.headers.get("cf-connecting-ip") + "</p>";
		html_content += "<p> IPv6: " + request.headers.get("cf-connecting-ipv6") + "</p>";
		html_content += "<hr/>";
		html_content += "<p> Colocation (IATA): " + request.cf.colo + "</p>";
		html_content += "<p> ISP: " + request.cf.asOrganization + "</p>";
		html_content += "<p> ASN: " + request.cf.asn + "</p>";
		html_content += "<p> Country: " + request.cf.country + "</p>";
		html_content += "<p> City: " + request.cf.city + "</p>";
		html_content += "<p> Continent: " + request.cf.continent + "</p>";
		html_content += "<p> Latitude: " + request.cf.latitude + "</p>";
		html_content += "<p> Longitude: " + request.cf.longitude + "</p>";
		html_content += "<p> Postal code: " + request.cf.postalCode + "</p>";
		html_content += "<p> Metro code: " + request.cf.metroCode + "</p>";
		html_content += "<p> Region: " + request.cf.region + "</p>";
		html_content += "<p> Region code: " + request.cf.regionCode + "</p>";
		html_content += "<p> Time zone: " + request.cf.timezone + "</p>";

		let html = `<!DOCTYPE html>
      <head>
        <title> Geolocation: Hello World </title>
        <style> ${html_style} </style>
      </head>
      <body>
        <h1>Geolocation: Hello World!</h1>
        <p>You now have access to geolocation data about where your user is visiting from.</p>
		<hr/>
        ${html_content}
      </body>`;

	  if (false) {
		return new Response(html, {
			headers: {
				"content-type": "text/html;charset=UTF-8",
			},
		});
	  }	
	  
      try {
        const response = await env.EMAIL.send({
			to: "zlaski@ziemas.net",
			from: "webmaster@sacramento-choo-choo.com",
			subject: "Welcome to our service!",
			// html: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
			text: "Welcome! Thanks for signing up."
		});
		
		return new Response(
			JSON.stringify({
				success: true,
				emailId: response.messageId,
				sendResponse: response
			}),
		);

  	  }
	  catch (err) {
        console.error("Error sending email: ", JSON.stringify(err, null, 2));
        return new Response("Error sending email: " + JSON.stringify(err, null, 2), { status: 555 });
	  }
      try {
        // Forward the request to the ASSETS binding
        return await env.ASSETS.fetch(request);
      } catch (err) {
        console.error("Error fetching asset: ", err);
        return new Response("Error fetching asset: " + err, { status: 404 });
      }

	}
}
