import Title from "@/components/Title";
import { IMAGE } from "@/app/constants/images";
import Link from "next/link";
import { formatDate } from "@/app/uitils/dateForatter";
import { getPosts } from "@/app/actions/post";
import styles from "./post.module.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function PostPage() {
  const posts = await getPosts();

  if (!posts) {
    return <div>게시물 목록 조회 실패</div>;
  }

  return (
    <section className="post-list flex flex-col w-full flex-1">
      <Title image={IMAGE.board1}>게시판</Title>

      <div className="inner container mx-auto flex flex-col gap-2 py-5">
        <h1 className="text-2xl font-bold text-center">내글</h1>
        <nav className="post-menu-wrap">
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {posts.map((post) => (
              <li key={post.id} className={styles["post-list"]}>
                <Link href={`/post/${post.id}`} className={styles["link-text"]}>
                  <div className="post-detail-header flex items-center w-full gap-2">
                    <Badge
                      className="h-5 min-w-10 rounded-full px-1 font-mono tabular-nums"
                      variant="outline"
                    >
                      {post.id}
                    </Badge>
                    <p className="font-bold">{post.title}</p>
                  </div>
                  <div className={styles["post-thumbnail"]}>
                    {post.thumbnail_url &&
                    post.thumbnail_url.startsWith("http") ? (
                      <Image
                        src={post.thumbnail_url}
                        alt="thumbnail"
                        width={300}
                        height={300}
                      />
                    ) : (
                      post.id
                    )}
                  </div>
                  <div className={styles["post-info"]}>
                    <div className={styles["profile-img"]}>^__^</div>
                    <div className="profile-info">
                      <div className="post-writer-name text-lg font-bold">
                        유저1
                      </div>
                      <div className="post-writer-date text-sm">
                        {formatDate(post.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button className="self-start">
          <Link href="/post/write">글쓰기</Link>
        </Button>
      </div>
    </section>
  );
}
