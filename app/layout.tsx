export const metadata = {
  title: "ETH Impulse Engine",
  description: "Ethereum directional impulse dashboard"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
