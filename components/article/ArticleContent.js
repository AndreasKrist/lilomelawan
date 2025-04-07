export default function ArticleContent({ children }) {
    return (
      <div className="prose dark:prose-dark lg:prose-lg max-w-none">
        {children}
      </div>
    );
  }