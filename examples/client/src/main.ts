import "./style.css";

import { FlagsSDK } from "../../../dist";

const app = document.querySelector<HTMLDivElement>("#app");

const sdk = new FlagsSDK({
  baseURL: "https://flags-api.basestack.co/v1",
  projectKey: "cmi66kums00020mpq5rw7ezx9",
  environmentKey: "cmi66kumz00040mpqps87kxn8",
});

async function render() {
  app!.innerHTML = `<p>Fetching flag...</p>`;

  try {
    const flag = await sdk.getFlag("header");

    app!.innerHTML = `
      <h1>Flags Client Example</h1>
      <p>Flag <code>${flag.slug}</code> is <strong>${
        flag.enabled ? "enabled" : "disabled"
      }</strong></p>
      <pre>${JSON.stringify(flag.payload, null, 2)}</pre>
    `;
  } catch (error) {
    app!.innerHTML = `<p>Failed to load flag: ${(error as Error).message}</p>`;
  }
}

render();
