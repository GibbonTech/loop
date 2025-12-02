import { redirect } from 'next/navigation';

export default async function HomePage() {
  redirect('/index.html');
  return null;
}
