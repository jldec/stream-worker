// https://x.com/threepointone/status/1818965603836641768
// https://gist.github.com/threepointone/b473807287172c2bbe97726343f1f97b

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  async fetch(): Promise<Response> {
    // a simple streaming response

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async pull(controller) {
					controller.enqueue(encoder.encode(`123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 1234\n`));
					controller.enqueue(encoder.encode(`123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 1234\n`));
					controller.enqueue(encoder.encode(`123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 1234\n`));
          for (let i = 0; i < 5; i++) {
            controller.enqueue(encoder.encode(`Hello world 😎😎: ${i}\n`));
            await sleep(1000);
          }
          controller.close();
        },
      }),
      {
        status: 200,
        headers: {
					"X-Content-Type-Options": "nosniff",  // nosniff avoids buffering in chrome
          "content-type": "text/plain; charset=utf8", // charset avoids buffering on firefox
          // "content-type": "text/x-unknown", // this will not,
          
          // some otehr explicit headers just in case
          "content-encoding": "identity",
          "transfer-encoding": "chunked",
        },
      }
    );
  },
};