export const metadata = {
  title: "The Master Perfumer",
  description: "AI perfume formula assistant"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
