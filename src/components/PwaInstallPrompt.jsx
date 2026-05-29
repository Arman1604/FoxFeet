import { useEffect, useState } from "react";

export default function PwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone || localStorage.getItem("foxfeet-pwa-dismissed") === "true") {
      return undefined;
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setIsVisible(true);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setIsVisible(false);
      localStorage.removeItem("foxfeet-pwa-dismissed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setIsVisible(false);
  };

  const dismiss = () => {
    localStorage.setItem("foxfeet-pwa-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible || !installPrompt) return null;

  return (
    <aside className="pwa-install-card" aria-label="Install FOXFEET app">
      <button className="pwa-install-close" type="button" onClick={dismiss} aria-label="Dismiss install prompt">
        x
      </button>
      <div>
        <p>Install App</p>
      </div>
      <button type="button" onClick={installApp}>
        Add
      </button>
    </aside>
  );
}
