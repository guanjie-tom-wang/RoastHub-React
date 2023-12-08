// pages/_app.js
import "../styles/normalize.css"; // adjust the path if necessary
import "../styles/style.css"; // adjust the path if necessary
import "bootstrap/dist/css/bootstrap.min.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
