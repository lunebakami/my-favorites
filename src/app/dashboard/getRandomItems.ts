export default function getRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = items.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
