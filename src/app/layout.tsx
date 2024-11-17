import '@/src/app/ui/global.css';
import { inter } from '@/src/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>:Deal</title>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
