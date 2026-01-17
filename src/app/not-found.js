import Link from 'next/link';


export function generateMetadata() {
  return {
    title: "404 - Nie znaleziono strony",
    description: "Strona, której szukasz, nie istnieje."
  };
}

export default function NotFound() {
    
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Strona nie znaleziona</h1>
      <p>Przykro nam, ale strona, której szukasz, nie istnieje.</p>
      <Link href="/">Powrót do strony głównej</Link>
    </div>
  );
}
