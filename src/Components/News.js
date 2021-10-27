export default function News({ index, title, points, author, time, comments,page }) {
    return (
      <>
        <div className="title">
          <div>
            {page*20 + index+1 }
            {". "}
            {title}
          </div>
        </div>
        <div className="content">
          {points} points by {author} {"|"} {Math.ceil(time / 86400)} hours ago{" "}
          {"|"} {comments} comments
        </div>
      </>
    );
  }
  