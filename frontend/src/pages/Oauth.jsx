import { useEffect } from "react";

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get("token");
    const username = params.get("username");

    if (window.opener && token && username) {
      window.opener.postMessage({ token, username }, window.location.origin);
    }

    window.close();
  }, []);

  return <div>Signing you in...</div>;
}
