export default function YandexVerificationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>{children}</body>
    </html>
  )
}
