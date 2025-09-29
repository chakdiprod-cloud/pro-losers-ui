import "./../styles/globals.css";

export const metadata = {
  title: "Pro Losers League",
  description: "Онлайн-турниры FIFA/EA FC с рейтингами и молниями ⚡️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
