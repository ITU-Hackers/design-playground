export function loadGoogleFont(family: string) {
  const id = `google-font-${family.replace(/\s/g, "-")}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }
}
