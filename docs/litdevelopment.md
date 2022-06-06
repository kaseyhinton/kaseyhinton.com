# Lit Application Developoment

### Helpful Links

[Lit Docs](https://lit.dev/docs/)

[MWC Github](https://github.com/material-components/material-web)

[MWC Demo](https://material-components.github.io/material-web/demos/index.html)

[Google Fonts](https://fonts.google.com/)
[Google Icons](https://fonts.google.com/icons)

### Common Patterns

#### Simple Snackbar

A simple example of providing an mwc-snackbar to the rest of your application.

Install NPM Dependencies

```bash
npm install @material/mwc-snackbar --save;
npm install @material/mwc-button --save;
npm install @material/mwc-icon-button --save;
```

src/my-app.js

```javascript
import { LitElement } from "lit";

import "@material/mwc-snackbar";
import "@material/mwc-button";
import "@material/mwc-icon-button";

class MyApp extends LitElement {
  openSnackbar = (labelText, action = "OK", timeoutMs = 5000) => {
    const snackbar = this.shadowRoot.querySelector("mwc-snackbar");
    if (!snackbar) {
      return;
    }
    snackbar.labelText = labelText;
    const button = snackbar.querySelector('mwc-button[slot="action"]');
    button.label = action;
    snackbar.timeoutMs = timeoutMs;
    snackbar.open = true;
  };

  firstUpdated() {
    this.addEventListener("open-snackbar", (event) => {
      this.openSnackbar(
        event?.detail?.text,
        event?.detail?.action,
        event?.detail?.timeout
      );
    });
  }

  render() {
    return html`
      <mwc-snackbar labelText="">
        <mwc-button slot="action"></mwc-button>
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
    `;
  }
}

customElements.define("my-app", MyApp);
```

src/components/my-component.js

```javascript
import { LitElement } from "lit";

import "@material/mwc-button";

class MyComponent extends LitElement {
  render() {
    return html` <mwc-button
      @click=${() =>
        this.dispatchEvent("open-snackbar", {
          bubbles: true,
          composed: true,
          detail: {
            text: "Something went wrong...",
            action: "Ok",
            timeout: "-1",
          },
        })}
      label="Open snackbar"
    >
    </mwc-button>`;
  }
}

customElements.define("my-component", MyComponent);
```

### Development Ideology

###

### Using MWC Components

### Build/Deployment
