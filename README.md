# Exam Chatbot

Exam Chatbot is a small web + serverless project that provides a front-end UI (`index.html`) and a serverless handler (`lambdaFunction.mjs`). It is intended as a starting point tp consolidate my knowledge for the AI practioner AWS certified exam for building an AI-powered chatbot for exam revision and Q&A workflows.

**Key goals:**
- Provide a minimal static UI for interacting with a chatbot.
- Demonstrate a serverless function (AWS Lambda compatible) implementing the backend logic.

**Contents**
- `index.html` — Simple client UI to interact with the chatbot.
- `lambdaFunction.mjs` — Serverless function module (ES module) that contains the backend handler.
- `README.md` — This file.

**Quick links**
- Frontend: `index.html`
- Serverless: `lambdaFunction.mjs`

**Prerequisites**
- Node.js 16+ (for working with `.mjs` and modern JS features).
- An optional cloud account (AWS) if you plan to deploy the Lambda.

**Local usage**

1. Serve the frontend

You can open `index.html` directly in a browser for basic testing, or serve it with a simple static server for correct MIME types and CORS handling:

```bash
# using npm http-server
npx http-server . -p 8080
# then open http://localhost:8080/index.html
```

2. Test / run the Lambda handler locally

`lambdaFunction.mjs` is an ES module. Depending on how the handler is exported, you can run a quick local invocation from Node to exercise the code. Example (adjust to match your handler signature):

```bash
node -e "import('./lambdaFunction.mjs').then(m=>{ const evt = {}; const ctx = {}; const cb=(err,res)=>{ console.log('err',err); console.log('res',res); }; if(typeof m.handler==='function') m.handler(evt,ctx,cb); else console.log('No handler exported'); })"
```

For more realistic local testing use the AWS SAM CLI or local unit tests.

**Environment & Configuration**

- If your backend requires API keys (for example an LLM provider), store them in environment variables and do not commit secrets to source control.
- Typical environment variables you might need:
  - `OPENAI_API_KEY` — API key for OpenAI (example only).
  - `OTHER_API_KEY` — Any other service key used by `lambdaFunction.mjs`.

When deploying to AWS Lambda, configure those environment variables in the Lambda configuration or use a secrets manager.

**Deployment**

AWS Lambda (recommended minimal steps):

1. Zip `lambdaFunction.mjs` (and any required node_modules) or package as part of a deployment bundle.
2. Create a Lambda function using the Node.js runtime that supports `.mjs` (Node 16+).
3. Upload the bundle or use CI/CD (GitHub Actions, AWS SAM, Serverless Framework).
4. Set environment variables in the Lambda configuration.
5. Optionally place an API Gateway in front of the Lambda to expose an HTTP endpoint for `index.html` to call.

Example: using a minimal AWS CLI zip deploy (simplified):

```bash
zip -r function.zip lambdaFunction.mjs node_modules
aws lambda update-function-code --function-name MyExamChatbotFn --zip-file fileb://function.zip
```

**Usage**

- Open the UI (`index.html`) and interact with the chatbot. The UI should call the serverless endpoint (if configured) to get responses.
- If you do not yet have a backend endpoint, you can stub responses in the front-end for UI testing.

**Development notes & recommendations**

- Keep secrets out of source control. Use environment variables or a secrets manager.
- Add tests for critical logic inside `lambdaFunction.mjs` (unit tests for prompt generation, rate-limiting, input validation).
- Validate and sanitize user inputs to avoid injection or excessive prompt length.

**Suggested next improvements**

- Add a `package.json` with scripts for linting, testing, and starting a development server.
- Add basic unit tests (Jest / Mocha) for `lambdaFunction.mjs`.
- Enhance `index.html` with a minimal JS client that calls the backend and renders chat messages.
- Add CI to run tests and deploy to a staging Lambda on merge.

**Troubleshooting**

- If `lambdaFunction.mjs` fails locally with syntax errors, ensure Node version is recent and the file uses proper ES module syntax.
- If CORS errors occur when the UI calls the Lambda, configure API Gateway CORS or serve both frontend and backend from the same origin during development.

**Contributing**

Contributions are welcome. For small projects like this, please:

1. Open an issue describing the change or bug.
2. Create a branch for your work and open a pull request with a clear description.

## Purpose

This project was developed as a practical learning exercise while studying for the AWS Certified AI Practitioner certification. The goal was to gain hands-on experience with Amazon Bedrock, AWS Lambda, serverless architectures, and retrieval-augmented generation (RAG) systems.

While intentionally lightweight, the project demonstrates core concepts used in modern AI applications and serves as a foundation for more advanced cloud and AI projects in my portfolio.



---