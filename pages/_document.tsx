import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <header>
        <a href="./"><button>Summary</button></a>
        <a href="./customer"><button>Customer</button></a>
        <a href="./librarian"><button>Librarian</button></a>
      </header>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
