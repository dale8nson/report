import { Suspense, createElement } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import clientPromise from "@/lib/mongodb";
import { Box, Paper, Skeleton, CircularProgress } from "@mui/material";
import './globals.css';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkHeadingId from 'remark-heading-id';
import rehypeReact from "rehype-react";
import rehypeParse from 'rehype-parse';
import * as prod from 'react/jsx-runtime';
import MDContents from "./MDContents";

const Page = async () => {
  const client = await clientPromise;
  const db = (client).db('report');
  const session = await db.collection('sessions').findOne({ user: 'barbur' });
  // if (session?.passwordValidated === "true") {
  const md = await db.collection('report').findOne({ title: 'report' }).then(doc => doc?.md);

  // @ts-expect-error: the react types are missing.
  const options = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

  const MarkDown = await unified()
    .use(remarkHeadingId, { defaults: true })
    .use(remarkParse)

    .use(remarkRehype)
    .use(rehypeReact, options)
    .process(md).then(md => md.result);

  console.log(`MarkDown:`, MarkDown);

  // console.log(`md:`, md);

  // const H2 = md.match(/^#{2}\s.+$/mg);

  // console.log(`H2:`, H2);

  // const H3 = md.match(/^#{3}\s.+$/mg);

  // console.log(`H3:`, H3);

  return (
    <MDContents key={crypto.randomUUID()} MDComponent={MarkDown} />
  );

}

export default Page;