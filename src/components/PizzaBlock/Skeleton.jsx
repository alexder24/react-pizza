import ContentLoader from 'react-content-loader';

export default function Skeleton() {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#d6d6d6"
      foregroundColor="#ecebeb">
      <circle cx="139" cy="120" r="120" />
      <rect x="0" y="261" rx="10" ry="10" width="280" height="33" />
      <rect x="0" y="309" rx="20" ry="20" width="280" height="87" />
      <rect x="0" y="418" rx="10" ry="10" width="119" height="37" />
      <rect x="127" y="417" rx="10" ry="10" width="150" height="40" />
    </ContentLoader>
  );
}
