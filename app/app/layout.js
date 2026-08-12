import "./globals.css";

export const metadata = {
  title: "Hindi AI Voice",
  description: "Hindi AI Voice Generator"
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
