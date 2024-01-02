import { ReactElement, Suspense } from "react";
import clientPromise from "@/lib/mongodb";
import './globals.css';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// @ts-expect-error
import remarkHeadingId from 'remark-heading-id';
import rehypeReact from "rehype-react";
import * as prod from 'react/jsx-runtime';
import MDContents from "./MDContents";
import CircularProgress  from "@mui/material/CircularProgress";

const Page = async () => {
  const client = await clientPromise;
  const db = (client).db('report');
  const session = await db.collection('sessions').findOne({ user: 'barbur' });
  // if (session?.passwordValidated === "true") {
  const md = await db.collection('report').findOne({ title: 'report' }).then(doc => doc?.md);

  // @ts-expect-error: the react types are missing.
  const options = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

  const MarkDown: ReactElement = await unified()
    .use(remarkHeadingId, { defaults: true })
    .use(remarkParse)

    .use(remarkRehype)
    .use(rehypeReact, options)
    .process(md).then(md => md.result);
  
  return (
    <Suspense fallback={<CircularProgress />}>
      <MDContents key={crypto.randomUUID()} MDComponent={MarkDown} />
    </Suspense>
  );

}

export const dynamic = 'force-dynamic';
export default Page;